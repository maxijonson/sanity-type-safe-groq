import { defineType } from "sanity";
import category from "./category";

export default defineType({
  name: "post",
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
    {
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: category.name }] }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "keywords",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Title", value: "title" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            annotations: [
              {
                name: "internalLink",
                type: "object",
                title: "Internal link",
                fields: [
                  {
                    name: "reference",
                    type: "reference",
                    to: [{ type: category.name }],
                  },
                ],
              },
            ],
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              {
                title: "Highlight",
                value: "highlight",
                icon: () => <span style={{ fontWeight: "bold" }}>H</span>,
                component: (props) => (
                  <span style={{ backgroundColor: "yellow" }}>
                    {props.children}
                  </span>
                ),
              },
            ],
          },
        },
        {
          name: "alert",
          type: "object",
          fields: [
            {
              name: "type",
              type: "string",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Warning", value: "warning" },
                  { title: "Danger", value: "danger" },
                ],
              },
            },
            {
              name: "message",
              type: "text",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
});
