import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn:
    (process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV) ===
    "production",
});
