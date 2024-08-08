import { q, type Selection, type TypeFromSelection } from "groqd";
import { categorySchema } from "../sanity.schemas";

export const categoryDetailsSelection = {
  type: ["_type", categorySchema.shape._type],
  id: ["_id", categorySchema.shape._id],
  title: categorySchema.shape.title,
  slug: ["slug.current", categorySchema.shape.slug.shape.current],
} satisfies Selection;

export type CategoryDetails = TypeFromSelection<
  typeof categoryDetailsSelection
>;
