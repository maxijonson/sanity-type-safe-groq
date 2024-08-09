import { qAnd } from "@/sanity/filters/and";
import { makeGetPostsQuery } from "./getPosts";
import type { Selection } from "groqd";
import { runQuery } from "../runQuery";

export const makeGetPostsByCategoryIdQuery = (filter?: string) =>
  makeGetPostsQuery(qAnd("$categoryId in categories[]._ref", filter));

export const getPostsByCategoryId = <S extends Selection>(
  categoryId: string,
  selection: S,
) =>
  runQuery(
    makeGetPostsByCategoryIdQuery().grab$(selection),
    { categoryId },
    {
      next: { tags: [`category-id-${categoryId}`] },
    },
  );
