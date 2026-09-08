import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

const sourceUrl = new URL("../app/_data/animation/source-content.json", import.meta.url);
const outputUrl = new URL("../app/_data/animation/public-content.json", import.meta.url);
const source = JSON.parse(await readFile(sourceUrl, "utf8"));

// Explicitly copy only fields consumed by public pages. The local source is read-only.
const publicContent = {
  schemaVersion: 1,
  annualRecommendations: Object.fromEntries(
    Object.entries(source.annualRecommendations).map(([year, record]) => [year, {
      label: record.label,
      intro: record.intro,
      ...(record.sourceNote ? { sourceNote: record.sourceNote } : {}),
      entries: record.entries.map((entry) => ({
        title: entry.title,
        aliases: entry.aliases,
        rank: entry.rank,
        category: entry.category,
        reviewText: entry.reviewText,
        reviewParagraphs: entry.reviewParagraphs.map((paragraph) =>
          typeof paragraph === "string" ? paragraph : { text: paragraph.text }),
        placeholder: entry.placeholder,
        provenance: entry.provenance,
      })),
    }]),
  ),
  reviews: source.reviews.map(({ id, title, aliases, paragraphs }) => ({ id, title, aliases, paragraphs })),
  evaFinal: {
    title: source.evaFinal.title,
    timepoints: source.evaFinal.timepoints.map(({ label, paragraphs }) => ({ label, paragraphs })),
  },
  hathaway: {
    title: source.hathaway.title,
    aliases: source.hathaway.aliases,
    paragraphs: source.hathaway.paragraphs,
  },
  masterArchive: {
    periods: source.masterArchive.periods,
    entries: source.masterArchive.entries.map(({ id, text, period, section }) => ({ id, text, period, section })),
  },
  supplementalWatchRecordCount: source.supplementalWatchRecords.length,
};

assert.equal(publicContent.masterArchive.entries.length, source.masterArchive.entries.length);
assert.equal(publicContent.reviews.length, source.reviews.length);
assert.ok(Number.isSafeInteger(publicContent.supplementalWatchRecordCount));
await writeFile(outputUrl, `${JSON.stringify(publicContent, null, 2)}\n`, "utf8");
console.log("Exported public animation content; local source and supplemental records were not modified.");
