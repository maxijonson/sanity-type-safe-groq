import { qAnd } from "@/sanity/filters/and";
import { makeGetPostsQuery } from "./getPosts";
import type { Selection } from "groqd";
import { runQuery } from "../runQuery";

export const makeFindPostBySlugQuery = (filter?: string) =>
  makeGetPostsQuery(qAnd("slug.current == $slug", filter));

export const findPostBySlug = <S extends Selection>(
  slug: string,
  selection: S,
) =>
  runQuery(
    makeFindPostBySlugQuery().grab$(selection).slice(0).nullable(),
    { slug },
    {
      next: { tags: [`post-slug-${slug}`] },
    },
  );
