import { qAnd } from "@/sanity/filters/and";
import { qType } from "@/sanity/filters/type";
import { q, type Selection } from "groqd";
import { runQuery } from "../runQuery";

export const makeGetPostsQuery = (filter?: string) =>
  q("*").filter(qAnd(qType("post"), filter));

export const getPosts = <S extends Selection>(selection: S) =>
  runQuery(
    makeGetPostsQuery().grab$(selection),
    {},
    {
      next: { tags: ["post"] },
    },
  );
