import test from 'node:test';
import assert from 'node:assert/strict';
import { sentences, sentenceText, assess } from '../sentences.js';
import { coverage } from '../coverage.js';

test('250 distinct additional exercises retain stable IDs and aligned pronunciation', () => {
  assert.equal(sentences.length, 269);
  assert.equal(new Set(sentences.map(s => s.id)).size, 269);
  assert.equal(new Set(sentences.map(sentenceText)).size, 269);
  for (const s of sentences) {
    assert.ok(s.words.length > 0);
    assert.ok(s.english && s.topic);
    for (const w of s.words) {
      assert.ok(w.hanzi && w.pinyin, `${s.id}: empty word`);
      assert.equal(Boolean(w.punctuation), /^[，、：]$/.test(w.hanzi));
      if (!w.punctuation) assert.ok(typeof w.meaning === 'string' && w.meaning.trim(), `${s.id}: missing English meaning for ${w.hanzi}`);
      if (!w.punctuation) assert.match(w.pinyin, /^[\p{Script=Latin}\s'·]+$/u, `${s.id}: invalid pinyin`);
    }
    assert.equal(assess(s, s.english).matched, true);
  }
  for (const s of sentences) {
    assert.doesNotMatch(sentenceText(s), /^你(?:听说|知道|觉得)/, 'Do not pad the bank with prefixed duplicates');
  }
});

test('every vocabulary entry, pitch phrase and suggested replacement is covered', () => {
  const entries = coverage();
  assert.ok(entries.length >= 130);
  assert.deepEqual(entries.filter(e => !e.ids.length).map(e => e.term), []);
  for (const term of ['可浏览、可搜索、可导航', '现场工作', '实地操作', '无法感知', '独一无二的优势', '主权', '自主']) {
    assert.ok(entries.some(e => e.term === term && e.ids.length), term);
  }
});
