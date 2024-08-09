import { qAnd } from "@/sanity/filters/and";
import { qType } from "@/sanity/filters/type";
import { q, type Selection } from "groqd";
import { runQuery } from "../runQuery";

export const makeGetCategoriesQuery = (filter?: string) =>
  q("*").filter(qAnd(qType("category"), filter));

export const getCategories = async <S extends Selection>(selection: S) =>
  runQuery(
    makeGetCategoriesQuery().grab$(selection),
    {},
    {
      next: { tags: ["category"] },
    },
  );
