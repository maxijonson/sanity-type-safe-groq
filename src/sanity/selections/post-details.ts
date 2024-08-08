import {
  q,
  type InferType,
  type Selection,
  type TypeFromSelection,
} from "groqd";
import { postSchema } from "../sanity.schemas";
import { categoryDetailsSelection } from "./category-details";

const postBodyBlock = postSchema.shape.body.element.options[0];
const postBodyAlert = postSchema.shape.body.element.options[1];

export const postDetailsSelection = {
  type: ["_type", postSchema.shape._type],
  id: ["_id", postSchema.shape._id],
  title: postSchema.shape.title,
  slug: ["slug.current", postSchema.shape.slug.shape.current],
  categories: q("categories").filter().deref().grab$(categoryDetailsSelection),
  keywords: postSchema.shape.keywords,
  body: q("body")
    .filter()
    .select({
      "_type == 'block'": {
        ...postBodyBlock.shape,
        markDefs: q("markDefs")
          .filter()
          .select({
            "_type == 'internalLink'": q("{...}.reference")
              .deref()
              .grab$(categoryDetailsSelection),
            default: {
              _key: q.string(),
              type: ["'unknown'", q.literal("unknown")],
              unknownType: ["_type", q.string()],
            },
          }),
      },
      "_type == 'alert'": postBodyAlert.shape,
      default: {
        _key: q.string(),
        type: ["'unknown'", q.literal("unknown")],
        unknownType: ["_type", q.string()],
      },
    }),
} satisfies Selection;

export type PostDetails = TypeFromSelection<typeof postDetailsSelection>;
