import { defineType } from "sanity";

export default defineType({
  name: "category",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    },
  ],
});
