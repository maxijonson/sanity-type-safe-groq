import type { Selection } from "groqd";
import { runSlicedQuery, type UnknownArrayQuery } from "../slice";
import { makeGetPostsQuery } from "./getPosts";
import { makeGetPostsByCategoryIdQuery } from "./getPostsByCategoryId";
import type { RunQueryParams, RunQueryOptions } from "../runQuery";

const runRecentPostsQuery = <S extends Selection>(
  query: UnknownArrayQuery,
  selection: S,
  amount = 4,
  params?: RunQueryParams,
  options?: RunQueryOptions
) => runSlicedQuery(query, selection, 0, amount - 1, params, options);

export const getRecentPosts = <S extends Selection>(selection: S, amount = 4) =>
  runRecentPostsQuery(
    makeGetPostsQuery(),
    selection,
    amount,
    {},
    {
      next: { tags: ["post"] },
    }
  );

export const getRecentPostsByCategoryId = <S extends Selection>(
  categoryId: string,
  selection: S,
  amount = 3
) =>
  runRecentPostsQuery(
    makeGetPostsByCategoryIdQuery(),
    selection,
    amount,
    { categoryId },
    {
      next: { tags: [`post-categoryId-${categoryId}`] },
    }
  );
