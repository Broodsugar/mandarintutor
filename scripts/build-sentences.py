"""Build exercises from 250 distinct contexts without prefixed duplicates.
No model/API dependency at runtime. Rebuild after editing the source content.
"""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parent.parent
vocabulary = (ROOT / 'vocabulary.md').read_text()
lexicon = {}
for line in vocabulary.split('## Suggested replacements')[0].splitlines():
    cells = [c.strip() for c in line.split('|')[1:-1]]
    if len(cells) == 3 and re.fullmatch(r'[\u4e00-\u9fff]+', cells[0]):
        lexicon[cells[0]] = cells[1].lower()
for line in (ROOT / 'app/content/supporting-pinyin.txt').read_text().splitlines():
    hanzi, pinyin = line.split(' ', 1)
    lexicon[hanzi] = pinyin
lexicon['变得'] = 'biàn de'
lexicon.update({'，': ',', '、': ',', '：': ':'})

# Word-level base pinyin retains third-tone spelling; apply the unambiguous
# bu-before-fourth-tone rule in connected text. Audio handles other tone sandhi.
def words(tokens):
    result = []
    for i, token in enumerate(tokens):
        if token not in lexicon:
            raise ValueError(f'Missing pinyin: {token}')
        pinyin = lexicon[token]
        if token == '不' and i + 1 < len(tokens):
            next_pinyin = lexicon[tokens[i + 1]].split()[0]
            # The first tone-marked vowel identifies the next syllable's tone.
            marks = re.findall(r'[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]', next_pinyin)
            if marks and marks[0] in 'àèìòùǜ':
                pinyin = 'bú'
        result.append({'hanzi': token, 'pinyin': pinyin, 'punctuation': token in '，、：'})
    result[0]['pinyin'] = result[0]['pinyin'][0].upper() + result[0]['pinyin'][1:]
    return result

contexts = []
topic = ''
for line in (ROOT / 'app/content/expansion.txt').read_text().splitlines():
    if line.startswith('# '):
        topic = line[2:]
    elif line.strip():
        hanzi, english = line.split('\t')
        contexts.append((topic, hanzi.split('|'), english))
assert len(contexts) == 250

result = []
# Interleave the ten topics, keeping the original statement IDs stable.
ordered = [contexts[topic_i * 25 + offset] for offset in range(25) for topic_i in range(10)]
for topic, tokens, english in ordered:
    result.append({'id': str(20 + len(result)), 'topic': topic, 'words': words(tokens), 'english': english, 'alternatives': [], 'ending': '。'})
assert len(result) == 250
assert len({''.join(w['hanzi'] for w in s['words']) for s in result}) == 250
(ROOT / 'app/content/extra-sentences.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
print(f'Built {len(result)} sentences from {len(contexts)} contexts; {len(lexicon)} pinyin entries.')
