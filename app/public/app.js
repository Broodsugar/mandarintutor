const $ = id => document.getElementById(id);
const synth = window.speechSynthesis;
let bank = [], sentences = [], index = 0, started = false, requestId = 0, repeatTimer, audio, utterance, provider, localSpeech = false, voices = [], checked = false;
const audioCache = new Map();
// Fisher–Yates gives every sentence an equal chance at every position.
function shuffle(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
const current = () => sentences[index];
const rate = () => Number($('speed').value);
function status(message, error = false) { $('audio-status').textContent = message; $('audio-status').classList.toggle('error', error); }
function stop() {
  requestId++;
  clearTimeout(repeatTimer);
  synth?.cancel();
  if (audio) { audio.pause(); audio.currentTime = 0; audio = null; }
  document.querySelectorAll('.speaking').forEach(el => el.classList.remove('speaking'));
  $('stop').disabled = true;
}
function voiceOptions() {
  const previous = $('voice').value;
  voices = (synth?.getVoices() || []).filter(v => /^(zh-(CN|TW|SG|Hans|Hant)|cmn)(-|$)/i.test(v.lang.replaceAll('_', '-')));
  $('voice').replaceChildren();
  if (localSpeech) $('voice').add(new Option('Tingting · Mandarin (local audio)', 'local'));
  if (provider === 'azure') $('voice').add(new Option('Azure · Mandarin', 'azure'));
  voices.forEach(v => { if (!(localSpeech && /tingting/i.test(v.name))) $('voice').add(new Option(`${v.name} · ${v.lang}`, v.voiceURI)); });
  if (!$('voice').options.length) $('voice').add(new Option('No Mandarin voice available', 'none'));
  if ([...$('voice').options].some(o => o.value === previous)) $('voice').value = previous;
  else if (localSpeech) $('voice').value = 'local';
  else {
    const tingting = voices.find(v => /tingting/i.test(v.name));
    if (tingting) $('voice').value = tingting.voiceURI;
  }
  if (!started) status($('voice').value === 'none' ? 'No Mandarin voice found. Install a Mandarin system voice or configure Azure, then reload.' : 'Press Start & listen to enable audio for this session.', $('voice').value === 'none');
}
async function play(wordIndex = null) {
  if (!current()) return;
  stop(); started = true; $('play').textContent = '▶ Replay sentence';
  const token = requestId;
  const s = current();
  const selected = wordIndex === null ? null : s.words[wordIndex];
  if (selected) {
    $('word-meaning').textContent = `${selected.hanzi} — ${selected.meaning}`;
    $('word-meaning').hidden = false;
  }
  const text = selected ? selected.hanzi : s.words.map(w => w.hanzi).join('') + (s.ending || '。');
  const label = selected ? selected.hanzi : 'sentence';
  let pass = 1;
  const playing = () => status(selected ? `Playing ${label}…` : `Playing sentence · ${pass} of 2…`);
  const ended = replay => {
    if (token !== requestId) return;
    if (selected || pass === 2) { finish(); return; }
    pass++;
    status('Listen once more…');
    repeatTimer = setTimeout(() => { if (token === requestId) replay(); }, 700);
  };
  const finish = () => { if (token !== requestId) return; stop(); status('Ready when you are. Tap a word or replay the sentence.'); };
  const fail = message => { if (token !== requestId) return; stop(); status(message, true); };
  const highlight = () => { if (selected) document.querySelectorAll(`[data-word="${wordIndex}"]`).forEach(el => el.classList.add('speaking')); };
  highlight();
  $('stop').disabled = false;
  if (['azure', 'local'].includes($('voice').value)) {
    const speechProvider = $('voice').value;
    status(`Preparing ${label}…`);
    const key = `${speechProvider}:${s.id}:${wordIndex}:${rate()}`;
    try {
      if (!audioCache.has(key)) {
        const response = await fetch('/api/speech', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: s.id, word: wordIndex, rate: rate(), provider: speechProvider }) });
        if (!response.ok) throw new Error((await response.json()).error);
        const blob = await response.blob();
        if (token !== requestId) return;
        if (audioCache.size >= 128) { const first = audioCache.keys().next().value; URL.revokeObjectURL(audioCache.get(first)); audioCache.delete(first); }
        audioCache.set(key, URL.createObjectURL(blob));
      }
      if (token !== requestId) return;
      audio = new Audio(audioCache.get(key));
      const clip = audio;
      const replay = async () => {
        if (token !== requestId) return;
        try {
          clip.currentTime = 0;
          await clip.play();
          if (token === requestId) { highlight(); playing(); }
        } catch (error) { fail(error.name === 'NotAllowedError' ? 'Tap Replay sentence to allow audio playback.' : 'Audio could not play. Try replaying or choose another voice.'); }
      };
      clip.onended = () => ended(replay);
      clip.onerror = () => fail('Audio could not play. Try replaying or choose another voice.');
      await replay();
    } catch (error) { fail(error.name === 'NotAllowedError' ? 'Tap Replay sentence to allow audio playback.' : error.message); }
    return;
  }
  const voice = voices.find(v => v.voiceURI === $('voice').value);
  if (!voice || !synth) { fail('No Mandarin voice found. Install a Mandarin system voice or configure Azure, then reload.'); return; }
  const speak = () => {
    if (token !== requestId) return;
    utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice; utterance.lang = voice.lang; utterance.rate = rate(); utterance.pitch = 1;
    utterance.onstart = () => { if (token === requestId) { highlight(); playing(); } };
    utterance.onend = () => ended(speak);
    utterance.onerror = e => { if (e.error !== 'interrupted' && e.error !== 'canceled') fail('Audio could not play. Tap Replay sentence or choose another Mandarin voice.'); };
    synth.speak(utterance);
  };
  speak();
}
function render() {
  stop(); checked = false;
  $('word-meaning').hidden = true;
  $('word-meaning').textContent = '';
  const s = current();
  $('count').textContent = String(index + 1).padStart(2, '0'); $('total').textContent = ` / ${sentences.length}`;
  $('topic').textContent = s.topic;
  $('sentence-hanzi').replaceChildren();
  $('grammar-hint').textContent = (s.hint || '').replace(/ · .*? = /, ' = ');
  $('grammar-hint').hidden = !s.hint;
  $('sentence').replaceChildren();
  const pairHighlight = word => {
    document.querySelectorAll('[data-word]').forEach(el => el.classList.toggle('paired', el.dataset.word === word));
  };
  s.words.forEach((w, i) => {
    for (const [container, script] of [['sentence-hanzi', 'hanzi']]) {
      const el = document.createElement(w.punctuation ? 'span' : 'button');
      el.textContent = w[script];
      el.className = w.punctuation ? 'punctuation' : script === 'hanzi' ? 'word hanzi-word' : 'word';
      if (!w.punctuation) {
        const tooltip = document.createElement('span');
        tooltip.className = 'pinyin-tooltip';
        tooltip.textContent = w.pinyin;
        tooltip.lang = 'zh-Latn';
        tooltip.id = `pinyin-${i}`;
        tooltip.setAttribute('role', 'tooltip');
        el.append(tooltip);
        el.setAttribute('aria-describedby', tooltip.id);
        el.type = 'button'; el.dataset.word = String(i);
        el.setAttribute('aria-label', `Hear ${w[script]}`);
        el.addEventListener('click', () => play(i));
        el.addEventListener('pointerenter', () => pairHighlight(String(i)));
        el.addEventListener('pointerleave', () => pairHighlight(document.activeElement?.dataset.word));
        el.addEventListener('focus', () => pairHighlight(String(i)));
        el.addEventListener('blur', () => pairHighlight(undefined));
      }
      $(container).append(el);
    }
  });
  $('sentence-hanzi').append(Object.assign(document.createElement('span'), { className: 'punctuation', textContent: s.ending || '。' }));
  $('sentence').append(Object.assign(document.createElement('span'), { className: 'punctuation', textContent: s.ending === '？' ? '?' : '.' }));
  $('focus').textContent = s.focus.length ? `Words to revisit: ${s.words.filter(w => s.focus.includes(w.pinyin)).slice(0, 3).map(w => w.hanzi).join(' · ')}` : 'Built around your vocabulary.';
  $('answer').value = ''; $('answer').disabled = false; $('answer').readOnly = false;
  $('feedback').hidden = true; $('check').disabled = false; $('play').disabled = false;
  $('next').textContent = index === sentences.length - 1 ? 'Start another round →' : 'Next sentence →';
  if (started && $('autoplay').checked) play();
  else if (started) status('Tap a word or replay the sentence.');
}
$('play').addEventListener('click', () => play());
$('stop').addEventListener('click', () => { stop(); status('Playback stopped.'); });
$('speed').addEventListener('change', () => { stop(); status('Speed changed. Tap a word or replay the sentence.'); });
$('voice').addEventListener('change', () => { stop(); status('Voice selected. Tap a word or replay the sentence.'); });
$('answer').addEventListener('keydown', event => {
  if (event.key !== 'Enter' || event.shiftKey || event.isComposing || event.keyCode === 229) return;
  event.preventDefault();
  if (!$('check').disabled) $('translation-form').requestSubmit($('check'));
});
$('translation-form').addEventListener('submit', async event => {
  event.preventDefault(); if (checked) return;
  $('check').disabled = true;
  try {
    const response = await fetch('/api/check', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: current().id, answer: $('answer').value }) });
    const result = await response.json(); if (!response.ok) throw new Error(result.error);
    checked = true; $('answer').readOnly = true;
    $('feedback-title').textContent = result.matched ? 'YES, YOU GOT IT' : 'COMPARE YOUR TRANSLATION';
    $('reference').textContent = result.english; $('hanzi').textContent = result.hanzi;
    $('feedback-note').textContent = result.matched ? 'Listen once more and connect the sounds with the meaning.' : 'Different wording can be correct. Does your answer express the same meaning?';
    $('self-review').hidden = result.matched; $('next').hidden = !result.matched; $('feedback').hidden = false;
    (result.matched ? $('next') : $('got-it')).focus();
  } catch (e) { status(e.message, true); $('check').disabled = false; }
});
function next() {
  index++;
  if (index >= sentences.length) { index = 0; sentences = shuffle(bank); }
  render(); $('answer').focus();
}
$('next').addEventListener('click', next);
$('got-it').addEventListener('click', next);
$('again').addEventListener('click', () => { sentences.push(current()); next(); });
window.addEventListener('pagehide', () => { stop(); for (const url of audioCache.values()) URL.revokeObjectURL(url); audioCache.clear(); });
synth?.addEventListener('voiceschanged', voiceOptions);
try {
  const response = await fetch('/api/practice');
  if (!response.ok) throw new Error('Could not load your practice set. Reload to try again.');
  const data = await response.json(); provider = data.provider; localSpeech = data.localSpeech; bank = data.sentences; sentences = shuffle(bank);
  $('bank-size').textContent = sentences.length;
  voiceOptions(); render();
} catch (error) { status(error.message, true); $('topic').textContent = 'Practice could not load'; }
