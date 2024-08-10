"use client";

import type { CategoryDetails } from "@/sanity/selections/category-details";
import type { PostBodyAlert, PostBodyInternalLink } from "@/sanity/selections/post-details";
import { cn } from "@/utils/cn";
import {
  PortableText,
  type PortableTextComponentProps,
  type PortableTextMarkComponentProps,
  type PortableTextProps,
  type PortableTextTypeComponentProps,
  type UnknownNodeType,
} from "next-sanity";
import Link from "next/link";

const PostBody = (props: PortableTextProps) => {
  return (
    <div className="prose prose-stone mx-auto dark:prose-invert w-full">
      <PortableText
        {...props}
        components={{
          unknownMark: (props: PortableTextMarkComponentProps) => {
            console.error(
              "[PostBody] Unknown mark:",
              props.value?.unknownType ?? props.markType,
              props
            );
            return null;
          },
          unknownType: (
            props: PortableTextComponentProps<
              UnknownNodeType & { unknownType?: string }
            >
          ) => {
            console.error(
              "[PostBody] Unknown type:",
              props.value.unknownType ?? props.value._type,
              props
            );
            return null;
          },
          marks: {
            internalLink: ({
              value,
              children,
            }: PortableTextMarkComponentProps<PostBodyInternalLink>) => {
              return <Link href={`/category/${value?.reference.slug}`}>{children}</Link>;
            },
            highlight: ({ children }: PortableTextMarkComponentProps) => {
              return <span className="bg-yellow-200">{children}</span>;
            },
          },
          types: {
            alert: ({
              value: { type, message },
            }: PortableTextTypeComponentProps<PostBodyAlert>) => {
              return (
                <div
                  className={cn("border-l-4 p-4", {
                    "bg-red-100 border-red-500 text-red-900": type === "danger",
                    "bg-yellow-100 border-yellow-500 text-yellow-900":
                      type === "warning",
                    "bg-blue-100 border-blue-500 text-blue-900":
                      type === "info",
                  })}
                >
                  {message}
                </div>
              );
            },
          },
        }}
      />
    </div>
  );
};

export default PostBody;
