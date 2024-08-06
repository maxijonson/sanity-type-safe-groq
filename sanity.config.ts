"use client";

import category from "@/sanity/schemas/documents/category";
import post from "@/sanity/schemas/documents/post";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset, 
  schema: {
    types: [post, category],
  },
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
});
