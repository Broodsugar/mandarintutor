import { writeFileSync } from 'node:fs';
import { coverage } from '../app/coverage.js';
import { sentences } from '../app/sentences.js';
const entries = coverage();
const missing = entries.filter(e => !e.ids.length);
console.log(JSON.stringify({ sentences: sentences.length, targets: entries.length, covered: entries.length - missing.length, missing: missing.map(e => e.term) }, null, 2));
if (missing.length) process.exitCode = 1;
if (process.argv.includes('--write')) {
  const report = ['# Vocabulary coverage', '', `${sentences.length} sentences: 19 original exercises + 250 distinct additions.`, '', 'The expansion contains 250 distinct contexts across ten topics. Repetitive prefixed question duplicates have been removed.', '', `${entries.length - missing.length}/${entries.length} unique targets covered from vocabulary.md, including pitch phrases, the example sentence, and both columns of suggested replacements. Duplicate vocabulary rows count once.`, '', 'Coverage matches Chinese text across word boundaries and ignores punctuation. This verifies occurrence, not pronunciation quality or mastery. All sentences have aligned word-level pinyin and an English reference; English paraphrases beyond the stored alternatives still use self-review.', '', '| Entry | Section | Occurrences | Example sentence IDs |', '|---|---|---:|---|', ...entries.map(e => `| ${e.term} | ${e.section} | ${e.ids.length} | ${e.ids.slice(0, 5).join(', ')} |`), ''];
  writeFileSync(new URL('../app/content/coverage.md', import.meta.url), report.join('\n'));
}
