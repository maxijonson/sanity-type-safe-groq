import { useCdn } from "@/sanity/lib/client";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { webhookBodyQuery } from "./query";

const webhookBodySchema = webhookBodyQuery.schema;

export const POST = async (req: NextRequest) => {
  try {
    const { isValidSignature, body } = await parseBody<unknown>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true
    );

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    const parseResult = webhookBodySchema.safeParse(body);
    if (!parseResult.success) {
      const message = "Invalid body";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 400,
      });
    }

    if (useCdn) {
      console.warn(
        "Sanity revalidate webhook called, but the app is currently using Sanity's CDN. Revalidation may not work as expected."
      );
    }

    const data = parseResult.data;
    const extraData: Record<string, unknown> = {};
    const tags = new Set<string>();

    const revalidate = (tag: string) => {
      if (!tag || tags.has(tag)) return;
      tags.add(tag);
      revalidateTag(tag);
    };

    revalidate(data.type);

    switch (data.type) {
      case "post":
        revalidate("post");
        revalidate(`post-slug-${data.slug}`);
        data.categories.forEach((category) => {
            revalidate(`post-categoryId-${category.id}`);
        })
        break;
      case "category":
        revalidate("category");
        revalidate(`category-id-${data.id}`);
        revalidate(`category-slug-${data.slug}`);
        break;
    }

    const payload = {
      revalidatedTags: Array.from(tags),
      data,
      extraData,
    } as const;

    return NextResponse.json(payload);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
    return new Response("An unknown error occurred", { status: 500 });
  }
};
