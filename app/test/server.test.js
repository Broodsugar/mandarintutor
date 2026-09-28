import test from 'node:test';
import assert from 'node:assert/strict';
import { makeServer } from '../server.js';
import { sentences } from '../sentences.js';

async function serve(t, options = {}) {
  const server = makeServer(options);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));
  const base = `http://127.0.0.1:${server.address().port}`;
  return (path, body) => fetch(base + path, body === undefined ? {} : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
}
test('practice hides answers, retains complete pinyin and word boundaries', async t => {
  const request = await serve(t, { key: '', region: '' });
  const data = await (await request('/api/practice')).json();
  assert.equal(data.provider, 'browser'); assert.equal(data.sentences.length, 269);
  for (const s of data.sentences) { assert.equal(s.english, undefined); assert.equal(s.alternatives, undefined); assert.ok(s.words.every(w => w.hanzi && w.pinyin)); }
  assert.equal((await request('/vocabulary.md')).status, 404);
  assert.equal((await request('/.env')).status, 404);
});
test('translation checking recognizes variants, rejects empty answers and leaves paraphrases for review', async t => {
  const request = await serve(t);
  const check = answer => request('/api/check', { id: '1', answer });
  assert.equal((await (await check('This platform supports third party applications!')).json()).matched, true);
  assert.equal((await (await check('It lets other developers run apps on the platform.')).json()).matched, false);
  assert.equal((await check(' ')).status, 400);
  assert.equal((await request('/api/check', { id: 'bad', answer: 'test' })).status, 400);
});
test('Azure receives Hanzi with speed controls, caches replay and validates word selection', async t => {
  const calls = [];
  const request = await serve(t, { key: 'test-key', region: 'eastus', fetchSpeech: async (url, options) => { calls.push({ url, ...options }); return new Response(Buffer.from('test audio'), { status: 200 }); } });
  const body = { id: '1', word: null, rate: 0.75 };
  assert.equal((await request('/api/speech', body)).status, 200);
  assert.equal((await request('/api/speech', body)).status, 200);
  assert.equal(calls.length, 1); assert.match(calls[0].body, /这个平台支持第三方应用。/); assert.match(calls[0].body, /-25%/);
  await request('/api/speech', { ...body, word: 1 }); assert.match(calls[1].body, />平台<\/prosody>/);
  assert.equal((await request('/api/speech', { ...body, word: 999 })).status, 400);
  assert.equal((await request('/api/speech', { ...body, rate: 99 })).status, 400);
  assert.ok(sentences.every(s => s.words.every(w => typeof w.pinyin === 'string')));
});
test('speech failures remain recoverable', async t => {
  const request = await serve(t, { key: 'test-key', region: 'eastus', fetchSpeech: async () => new Response('', { status: 401 }) });
  assert.equal((await request('/api/speech', { id: '1', word: null, rate: 1 })).status, 502);
});
test('local Tingting renders Hanzi, caches replay, and reports native failures', async t => {
  const calls = [];
  const request = await serve(t, { nativeSpeech: async (text, rate) => { calls.push({ text, rate }); if (text === '平台') throw new Error('unavailable'); return Buffer.from('RIFF-test-audio'); } });
  const body = { id: '1', word: null, rate: 0.75, provider: 'local' };
  const result = await request('/api/speech', body);
  assert.equal(result.headers.get('content-type'), 'audio/wav');
  assert.equal(await result.text(), 'RIFF-test-audio');
  await request('/api/speech', body);
  assert.deepEqual(calls, [{ text: '这个平台支持第三方应用。', rate: 0.75 }]);
  for (const rate of [0.5, 0.35]) {
    assert.equal((await request('/api/speech', { ...body, rate })).status, 200);
    assert.equal(calls.at(-1).rate, rate);
  }
  assert.equal((await request('/api/speech', { ...body, word: 1 })).status, 502);
  assert.equal((await (await request('/api/practice')).json()).localSpeech, true);
});
