import { qType } from "@/sanity/filters/type";
import { categoryDetailsSelection } from "@/sanity/selections/category-details";
import { postDetailsSelection } from "@/sanity/selections/post-details";
import { pick } from "@/sanity/selections/utils/pick";
import { nullToUndefined, q } from "groqd";

// Use this as the webhook filter value in Sanity's dashboard.
export const webhookFilter = "_type in ['post', 'category']";

// Put this query in the groq-preview.ts script to view everything you'll need to provide the webhook with the information it needs.
export const webhookBodyQuery = q("*")
  .filter(webhookFilter)
  .slice(0)
  .select({
    [qType("post")]: nullToUndefined(
      pick(postDetailsSelection, ["type", "slug", "categories"])
    ),
    [qType("category")]: nullToUndefined(
      pick(categoryDetailsSelection, ["type", "slug", "id"])
    ),
    default: {
      type: ["'unknown'", q.literal("unknown")],
      unknownType: ["_type", q.string()],
    },
  });
