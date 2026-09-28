This simple mandarin tutor has helped me level up really quickly!

To use it, simply replace target.md and aspiration.md and ask Claude to reset your progress.

Best of luck!

## Sentence practice app

Requires Node.js 20 or newer. From this folder, run `npm start` and open
[Mandarin practice](http://localhost:4317). There are no dependencies to install.

Press **Start & listen** once to enable audio. Hover over a hanzi word to reveal
its pinyin; click it to hear the word and see its English meaning.
Press Enter to check your translation (Shift+Enter adds a new line).
Replay the whole sentence, or choose 1×, 0.75×, 0.5×, or 0.35× (default) speech speed.
Tingting is selected by default when available. Sentences play twice with a short
pause; individual words play once. Stop, a new word, or a new sentence cancels
the pending repeat.
Sentences are shuffled on page load and at the start of each new round. New sentences read aloud
automatically after that first interaction (subject to browser autoplay rules).

The app includes 269 sentences: the original 19 plus 250 distinct additions covering all
130 unique targets in `vocabulary.md`, including pitch phrases and suggested
replacements. The expansion contains 250 distinct contexts across ten topics. Repetitive
question-prefix duplicates have been removed. English stays
hidden until you submit a translation. It recognizes a small list of accepted
translations; other answers show a reference for self-assessment, not AI grading.
“Practise this again” adds the sentence to the end of the current round. This
session is temporary; the app does not update the tutor's Markdown progress files.

On macOS, Tingting uses native speech rendered to cached WAV audio, avoiding
browser speech queue failures. It needs no Azure credentials. Other installed
Mandarin voices use browser speech synthesis. If no Mandarin
voice is available, install one in your device's speech settings or configure Azure.
The browser preview may expose different voices from Safari or Chrome.

### Azure Speech (optional)

Copy `.env.example` to `.env` and set `AZURE_SPEECH_KEY` and
`AZURE_SPEECH_REGION` using an Azure Speech resource, then restart `npm start`.
You can also set `AZURE_SPEECH_VOICE` (default: `zh-CN-XiaoxiaoNeural`).
The key stays on the server. Only the selected sentence/word is sent to Azure;
audio is cached in memory. Azure usage is billed to your resource.
See [Azure's TTS documentation](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/rest-text-to-speech).

The server binds to localhost. Public hosting would need authentication and usage
limits before exposing the paid speech endpoint.

Run `npm test` for API, translation, and mocked Azure speech checks. Live Azure
voice quality requires real credentials and listening tests. The original sentences are in `app/sentences.js`. Expansion source contexts are in
`app/content/expansion.txt`, with supporting pinyin in
`app/content/supporting-pinyin.txt`. Run `npm run content:build` to rebuild the
checked-in JSON, then `npm run content:check` for the coverage report in
`app/content/coverage.md`. Restart the server after changing content.
Weak-word hints read `weak.md` at load.
