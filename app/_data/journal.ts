import records from "./journal-data.json";

export type JournalPhoto = { src: string; small: string; smallWidth: number; width: number; height: number; alt: string };
export type JournalEntry = { slug: string; date: string; year: string; title: string; category: string; categoryLabel: string; place: string; paragraphs: string[]; photos: JournalPhoto[]; relatedHref: string | null };
export const journalEntries: JournalEntry[] = records;
export const journalYears = [...new Set(journalEntries.map(entry => entry.year))].sort().reverse();
export const journalPhotoCount = journalEntries.reduce((sum, entry) => sum + entry.photos.length, 0);
export const journalEntryHref = (entry: JournalEntry) => `/life/journal/${entry.year}#entry-${entry.slug}`;
