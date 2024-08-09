import { qAnd } from "@/sanity/filters/and";
import { makeGetCategoriesQuery } from "./getCategories";
import { runQuery } from "../runQuery";
import type { Selection } from "groqd";

export const makeFindCategoryBySlugQuery = (filter?: string) =>
  makeGetCategoriesQuery(qAnd("slug.current == $slug", filter));

export const findCategoryBySlug = <S extends Selection>(
  slug: string,
  selection: S
) =>
  runQuery(
    makeFindCategoryBySlugQuery().grab$(selection).slice(0).nullable(),
    { slug },
    {
      next: { tags: [`category-slug-${slug}`] },
    }
  );
