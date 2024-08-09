import { makeSafeQueryRunner } from "groqd";
import type { FilteredResponseQueryOptions } from "next-sanity";
import { client } from "../lib/client";

export type RunQueryParams = Record<string, unknown>;
export type RunQueryOptions = FilteredResponseQueryOptions;

export const runQuery = makeSafeQueryRunner(
  async (query, params?: RunQueryParams, options?: RunQueryOptions) => {
    return client.fetch(query, params, options);
  },
);
