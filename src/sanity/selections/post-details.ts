import {
  nullToUndefined,
  q,
  type InferType,
  type Selection,
  type TypeFromSelection,
} from "groqd";
import { postSchema } from "../sanity.schemas";
import { categoryDetailsSelection, type CategoryDetails } from "./category-details";

const postBodyBlock = postSchema.shape.body.element.options[0];
export type PostBodyBlock = InferType<typeof postBodyBlock>;

// If there were more than 1 mark def, we would need element.shape.options[n] instead
const postBodyInternalLink = postBodyBlock.shape.markDefs.unwrap().element;
export type PostBodyInternalLink = Omit<InferType<typeof postBodyInternalLink>, "reference"> & {
  reference: CategoryDetails;
};

const postBodyAlert = postSchema.shape.body.element.options[1];
export type PostBodyAlert = InferType<typeof postBodyAlert>;

export const postDetailsSelection = {
  type: ["_type", postSchema.shape._type],
  id: ["_id", postSchema.shape._id],
  title: postSchema.shape.title,
  slug: ["slug.current", postSchema.shape.slug.shape.current],
  categories: q("categories").filter().deref().grab$(categoryDetailsSelection),
  keywords: postSchema.shape.keywords,
  // Usually, we could have used postSchema.shape.body, but we need to deref internalLinks. 
  body: q("body")
    .filter()
    .select({
      "_type == 'block'": nullToUndefined({
        ...postBodyBlock.shape,
        markDefs: q("markDefs")
          .filter()
          .select({
            "_type == 'internalLink'": nullToUndefined({
              ...postBodyInternalLink.shape,
              reference: q("@.reference").deref().select({
                "_type == 'category'": categoryDetailsSelection,
              }),
            }),
            default: {
              _key: q.string(),
              _type: ["'unknown'", q.literal("unknown")],
              unknownType: ["_type", q.string()],
            },
          }),
      }),
      "_type == 'alert'": nullToUndefined(postBodyAlert.shape),
      default: {
        _key: q.string(),
        _type: ["'unknown'", q.literal("unknown")],
        unknownType: ["_type", q.string()],
      },
    }),
} satisfies Selection;

export type PostDetails = TypeFromSelection<typeof postDetailsSelection>;
