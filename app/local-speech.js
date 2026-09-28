import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const run = promisify(execFile);
// Render native Tingting to a file: browser speech queues can silently end on macOS.
export async function localSpeech(text, rate) {
  const directory = await mkdtemp(join(tmpdir(), 'mandarin-audio-'));
  try {
    const source = join(directory, 'speech.aiff');
    const output = join(directory, 'speech.wav');
    await run('/usr/bin/say', ['-v', 'Tingting', '-r', String(Math.round(180 * rate)), '-o', source, text], { timeout: 15000 });
    await run('/usr/bin/afconvert', ['-f', 'WAVE', '-d', 'LEI16', source, output], { timeout: 10000 });
    const audio = await readFile(output);
    if (audio.length < 1000) throw new Error('Tingting returned empty audio.');
    return audio;
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}
