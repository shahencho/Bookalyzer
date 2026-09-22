import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";
import { importBookFile } from "../lib/content/importBook";

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const patterns = args.length > 0 ? args : ["content/books/*.json"];

  // Expand simple glob-free directory patterns (content/books/*.json) without
  // pulling in a glob dependency — this repo's content files always live
  // flat in content/books/.
  const files: string[] = [];
  for (const pattern of patterns) {
    if (pattern.includes("*")) {
      const dir = path.dirname(pattern);
      const all = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
      files.push(...all.map((f) => path.join(dir, f)));
    } else {
      files.push(pattern);
    }
  }

  let failures = 0;
  for (const file of files) {
    try {
      const raw = JSON.parse(fs.readFileSync(file, "utf-8"));
      await importBookFile(prisma, raw, file);
      console.log(`OK   ${file}`);
    } catch (err) {
      failures++;
      console.error(`FAIL ${file}`);
      console.error(err instanceof Error ? err.message : err);
    }
  }

  await prisma.$disconnect();
  if (failures > 0) {
    console.error(`\n${failures} file(s) failed to import.`);
    process.exit(1);
  }
  console.log(`\nImported ${files.length} file(s) successfully.`);
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
