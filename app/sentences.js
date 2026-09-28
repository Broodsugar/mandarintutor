import { wordMeaning } from './word-meanings.js';
import { readFileSync } from 'node:fs';
const extraSentences = JSON.parse(readFileSync(new URL('./content/extra-sentences.json', import.meta.url), 'utf8'));
// Explicit word boundaries keep multi-syllable words together for playback.
const rows = [
  ['Platform', '这个|平台|支持|第三方|应用', 'Zhège|píngtái|zhīchí|dìsānfāng|yìngyòng', 'This platform supports third-party apps.', ['This platform supports third party applications.']],
  ['Getting ready', '硬件|已经|准备|好了|，|可是|软件|尚未|到位', 'Yìngjiàn|yǐjīng|zhǔnbèi|hǎo le|,|kěshì|ruǎnjiàn|shàngwèi|dàowèi', 'The hardware is ready, but the software is not yet in place.', ['The hardware is already ready but the software is not ready yet.']],
  ['The physical world', '机器人|能够|感知|物理|空间', 'Jīqìrén|nénggòu|gǎnzhī|wùlǐ|kōngjiān', 'Robots can perceive physical space.', ['The robot can perceive physical space.']],
  ['Working together', '我们|让|人类|和|机器人|一起|工作', 'Wǒmen|ràng|rénlèi|hé|jīqìrén|yìqǐ|gōngzuò', 'We enable humans and robots to work together.', ['We let humans and robots work together.', 'We make humans and robots work together.']],
  ['A useful assistant', '智能|助理|辅助|工人|完成|工作', 'Zhìnéng|zhùlǐ|fǔzhù|gōngrén|wánchéng|gōngzuò', 'The smart assistant helps workers complete their work.', ['The intelligent assistant assists workers in completing their work.']],
  ['Making connections', '这个|平台|连接|数字|世界|和|实体|世界', 'Zhège|píngtái|liánjiē|shùzì|shìjiè|hé|shítǐ|shìjiè', 'This platform connects the digital world and the physical world.', ['This platform connects the digital world to the physical world.']],
  ['Next year', '明年|我们|将|扩展|业务', 'Míngnián|wǒmen|jiāng|kuòzhǎn|yèwù', 'Next year we will expand our business.', ['We will expand our business next year.']],
  ['A real advantage', '我们|的|优势|在于|理解|实体|世界', 'Wǒmen|de|yōushì|zàiyú|lǐjiě|shítǐ|shìjiè', 'Our advantage lies in understanding the physical world.', []],
  ['Filling the gap', '这个|产品|能够|填补|这个|缺口', 'Zhège|chǎnpǐn|nénggòu|tiánbǔ|zhège|quēkǒu', 'This product can fill this gap.', ['This product is able to fill this gap.']],
  ['Shared knowledge', '机器人|通过|互联网|共享|信息', 'Jīqìrén|tōngguò|hùliánwǎng|gòngxiǎng|xìnxī', 'Robots share information through the internet.', ['Robots share information via the internet.', 'The robot shares information over the internet.']],
  ['Joining the platform', '上千|个|商业体|已经|加入|我们|的|平台', 'Shàng qiān|gè|shāngyètǐ|yǐjīng|jiārù|wǒmen|de|píngtái', 'Over a thousand businesses have already joined our platform.', ['More than a thousand business entities have already joined our platform.']],
  ['Real-world use', '我们|将|五百|台|机器人|投入|实际|使用', 'Wǒmen|jiāng|wǔbǎi|tái|jīqìrén|tóurù|shíjì|shǐyòng', 'We will put five hundred robots into actual use.', ['We will deploy 500 robots for real-world use.']],
  ['Revenue', '这个|平台|每年|带来|数百万|美元|的|收入', 'Zhège|píngtái|měinián|dàilái|shù bǎi wàn|měiyuán|de|shōurù', 'This platform brings in several million dollars in revenue every year.', []],
  ['Understanding', '机器人|还|无法|理解|这个|空间', 'Jīqìrén|hái|wúfǎ|lǐjiě|zhège|kōngjiān', 'The robot still cannot understand this space.', ['Robots are still unable to understand this space.']],
  ['The economy', '全球|经济|仍然|依赖|人力|劳动', 'Quánqiú|jīngjì|réngrán|yīlài|rénlì|láodòng', 'The global economy still depends on human labor.', ['The global economy still relies on human labour.']],
  ['Integration', '我们|让|机器人|真正|融入|实体|世界', 'Wǒmen|ràng|jīqìrén|zhēnzhèng|róngrù|shítǐ|shìjiè', 'We enable robots to truly integrate into the physical world.', ['We let robots truly integrate into the physical world.']],
  ['Finding the way', '智能|眼镜|能够|辅助|我们|导航', 'Zhìnéng|yǎnjìng|nénggòu|fǔzhù|wǒmen|dǎoháng', 'Smart glasses can help us navigate.', []],
  ['A distinctive position', '我们|处于|独特|的|位置', 'Wǒmen|chǔyú|dútè|de|wèizhì', 'We are in a unique position.', ['We are in a distinctive position.']],
  ['Robot colleagues', '人类|监督|越|少|，|机器人|越|像|同事', 'Rénlèi|jiāndū|yuè|shǎo|,|jīqìrén|yuè|xiàng|tóngshì', 'The less humans supervise, the more robots resemble colleagues.', ['The less human supervision there is, the more robots are like colleagues.', 'The less humans supervise, the more robots are like coworkers.'], 'Extra: 越…越… · yuè…yuè… = the more… the more…'],
];
const originalSentences = rows.map(([topic, hanzi, pinyin, english, alternatives, hint], i) => {
  const syllables = pinyin.split('|');
  return { id: String(i + 1), topic, words: hanzi.split('|').map((hanzi, j) => ({ hanzi, pinyin: syllables[j], punctuation: hanzi === '，' })), english, alternatives, hint };
});
export const sentences = [...originalSentences, ...extraSentences].map(s => ({
  ...s, words: s.words.map(w => w.punctuation ? w : { ...w, meaning: wordMeaning(w.hanzi) })
}));
export const sentenceText = s => s.words.map(w => w.hanzi).join('') + (s.ending || '。');
export const normalize = text => text.toLowerCase().replace(/[-–—]/g, ' ').replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
export function assess(sentence, answer) {
  return { matched: [sentence.english, ...sentence.alternatives].some(value => normalize(value) === normalize(answer)), english: sentence.english, hanzi: sentenceText(sentence) };
}
