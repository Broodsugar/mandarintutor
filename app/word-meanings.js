import { readFileSync } from 'node:fs';

const vocabulary = readFileSync(new URL('../vocabulary.md', import.meta.url), 'utf8');
const meanings = new Map();
for (const line of vocabulary.split('## Suggested replacements')[0].split('\n')) {
  const cells = line.split('|').slice(1, -1).map(s => s.trim());
  if (cells.length === 3 && /^[\p{Script=Han}]+$/u.test(cells[0])) {
    // Keep concise definitions; pitch feedback belongs in the tutor notes.
    meanings.set(cells[0], cells[2].split(' (')[0].split(' — ')[0]);
  }
}
for (const line of readFileSync(new URL('./content/supporting-meanings.txt', import.meta.url), 'utf8').trim().split('\n')) {
  const [hanzi, meaning] = line.split('\t');
  meanings.set(hanzi, meaning);
}
export function wordMeaning(hanzi) {
  const meaning = meanings.get(hanzi);
  if (!meaning) throw new Error(`Missing word meaning: ${hanzi}`);
  return meaning;
}
