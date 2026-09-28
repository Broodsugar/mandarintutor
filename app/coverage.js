import { readFileSync } from 'node:fs';
import { sentences, sentenceText } from './sentences.js';

export const compact = text => text.replace(/[^\p{Script=Han}]/gu, '');
export function coverage() {
  const text = readFileSync(new URL('../vocabulary.md', import.meta.url), 'utf8');
  const terms = new Map();
  let section = '';
  for (const line of text.split('\n')) {
    if (line.startsWith('## ')) section = line.slice(3);
    const cells = line.split('|').slice(1, -1).map(s => s.trim());
    if (cells.length !== 3) continue;
    if (section.startsWith('Suggested replacements')) {
      // Include both the original wording and every proposed replacement.
      for (const cell of cells.slice(0, 2)) {
        for (const match of cell.matchAll(/[\p{Script=Han}]+/gu)) terms.set(match[0], section);
      }
    } else if (/^[\p{Script=Han}、，。]+$/u.test(cells[0])) {
      terms.set(cells[0], section);
    }
  }
  return [...terms].map(([term, section]) => ({ term, section, ids: sentences.filter(s => compact(sentenceText(s)).includes(compact(term))).map(s => s.id) }));
}
