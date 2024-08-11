import { q, type Selection } from "groqd";
import { runQuery, type RunQueryOptions, type RunQueryParams } from "./runQuery";

const unknownArrayQuery = q("").filter();
export type UnknownArrayQuery = typeof unknownArrayQuery;

export const makeSlicedQuery = (
  query: UnknownArrayQuery,
  sliceStart: number,
  sliceEnd: number,
  orderings: string[] = ["_createdAt desc"],
) => query.order(...orderings).slice(sliceStart, sliceEnd);

export const runSlicedQuery = <S extends Selection>(
  query: UnknownArrayQuery,
  selection: S,
  sliceStart: number,
  sliceEnd: number,
  params?: RunQueryParams,
  options?: RunQueryOptions,
) =>
  runQuery(
    makeSlicedQuery(query, sliceStart, sliceEnd).grab$(selection),
    params,
    options,
  );
