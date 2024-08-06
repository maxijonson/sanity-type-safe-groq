import fs from "fs/promises";
import path from "path";

(async () => {
  // You might need to update this if your file structure is not the same as mine
  const schemaFile = path.join(
    __dirname,
    "..",
    "src",
    "sanity",
    "sanity.schemas.ts"
  );
  const schemaContent = await fs.readFile(schemaFile, "utf-8");
  const groqdImport = 'import { q as z } from "groqd";';
  const groqdImportRegex = /import { z } from "zod";/;
  const newSchemaContent = schemaContent.replace(groqdImportRegex, groqdImport);
  await fs.writeFile(schemaFile, newSchemaContent);
  console.log("✔ Updated sanity.schemas.ts with groqd import");
})();
