import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { sentences, sentenceText, assess } from './sentences.js';
import { localSpeech } from './local-speech.js';

// Optional local configuration; credentials never enter public assets.
try {
  for (const line of (await readFile(new URL('../.env', import.meta.url), 'utf8')).split('\n')) {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
  }
} catch (e) { if (e.code !== 'ENOENT') throw e; }

const escapeXml = s => s.replace(/[<>&'" ]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;', ' ': ' ' }[c]));
export function makeServer({ key = process.env.AZURE_SPEECH_KEY, region = process.env.AZURE_SPEECH_REGION, voice = process.env.AZURE_SPEECH_VOICE || 'zh-CN-XiaoxiaoNeural', fetchSpeech = fetch, nativeSpeech = process.platform === 'darwin' ? localSpeech : null } = {}) {
  const cache = new Map();
  const azure = Boolean(key && region && /^[a-z0-9-]+$/.test(region));
  const files = { '/': ['index.html', 'text/html'], '/app.js': ['app.js', 'text/javascript'], '/style.css': ['style.css', 'text/css'] };
  return createServer(async (req, res) => {
    const json = (status, value) => { res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(value)); };
    try {
      const url = new URL(req.url, 'http://localhost');
      // Local-only app: reject cross-origin requests and DNS rebinding hosts.
      if (!/^(localhost|127\.0\.0\.1)(:\d+)?$/.test(req.headers.host || '')) return json(403, { error: 'Local access only.' });
      if (req.headers.origin && req.headers.origin !== `http://${req.headers.host}`) return json(403, { error: 'Cross-origin request rejected.' });
      if (req.method === 'GET' && url.pathname === '/api/practice') {
        const weak = await readFile(new URL('../weak.md', import.meta.url), 'utf8').catch(() => '');
        return json(200, { provider: azure ? 'azure' : 'browser', localSpeech: Boolean(nativeSpeech), sentences: sentences.map(({ english, alternatives, ...s }) => ({ ...s, focus: s.words.filter(w => weak.includes(`| ${w.hanzi} |`)).map(w => w.pinyin) })) });
      }
      if (req.method === 'POST' && ['/api/check', '/api/speech'].includes(url.pathname)) {
        let raw = '';
        for await (const chunk of req) { raw += chunk; if (Buffer.byteLength(raw) > 8192) return json(413, { error: 'Request too large.' }); }
        let body; try { body = JSON.parse(raw); } catch { return json(400, { error: 'Invalid request.' }); }
        const s = sentences.find(s => s.id === body?.id);
        if (!s) return json(400, { error: 'Unknown sentence.' });
        if (url.pathname === '/api/check') {
          if (typeof body.answer !== 'string' || !body.answer.trim() || body.answer.length > 2000) return json(400, { error: 'Enter an English translation first.' });
          return json(200, assess(s, body.answer));
        }
        const local = body.provider === 'local';
        if (local ? !nativeSpeech : !azure) return json(503, { error: 'This voice is unavailable. Choose another Mandarin voice.' });
        if (![1, 0.75, 0.5, 0.35].includes(body.rate) || (body.word !== null && (!Number.isInteger(body.word) || !s.words[body.word] || s.words[body.word].punctuation))) return json(400, { error: 'Invalid speech selection.' });
        const text = body.word === null ? sentenceText(s) : s.words[body.word].hanzi;
        const cacheKey = `${local ? 'local:Tingting' : voice}:${body.rate}:${text}`;
        if (local) {
          if (!cache.has(cacheKey)) {
            // Cache in-flight generation as well, so repeated clicks share one job.
            if (cache.size >= 256) cache.delete(cache.keys().next().value);
            cache.set(cacheKey, nativeSpeech(text, body.rate));
          }
          try {
            const audio = await cache.get(cacheKey);
            res.writeHead(200, { 'Content-Type': 'audio/wav', 'Cache-Control': 'private, max-age=86400' });
            return res.end(audio);
          } catch {
            cache.delete(cacheKey);
            return json(502, { error: 'Tingting could not generate audio. Try replaying or choose another Mandarin voice.' });
          }
        }
        if (!cache.has(cacheKey)) {
          const response = await fetchSpeech(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
            method: 'POST', signal: AbortSignal.timeout(15000), headers: { 'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3', 'User-Agent': 'MandarinPractice' },
            body: `<speak version="1.0" xml:lang="zh-CN"><voice name="${escapeXml(voice)}"><prosody rate="${Math.round((body.rate - 1) * 100)}%">${escapeXml(text)}</prosody></voice></speak>`
          });
          if (!response.ok) return json(502, { error: 'Azure could not generate audio. Try again or choose a browser voice.' });
          const audio = Buffer.from(await response.arrayBuffer());
          if (cache.size >= 256) cache.delete(cache.keys().next().value);
          cache.set(cacheKey, audio);
        }
        res.writeHead(200, { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'private, max-age=86400' }); return res.end(cache.get(cacheKey));
      }
      if (req.method === 'GET' && files[url.pathname]) {
        const [file, mime] = files[url.pathname];
        res.writeHead(200, { 'Content-Type': `${mime}; charset=utf-8`, 'X-Content-Type-Options': 'nosniff', 'Content-Security-Policy': "default-src 'self'; media-src 'self' blob:; style-src 'self'; script-src 'self'; connect-src 'self'" });
        return res.end(await readFile(new URL(`public/${file}`, import.meta.url)));
      }
      json(404, { error: 'Not found.' });
    } catch { if (!res.headersSent) json(500, { error: 'Something went wrong. Please try again.' }); else res.end(); }
  });
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4317);
  makeServer().listen(port, '127.0.0.1', () => console.log(`Mandarin practice: http://localhost:${port}`));
}
