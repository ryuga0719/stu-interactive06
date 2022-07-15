import { randomRange } from "./MathUtils";


/**
* createEmoji
* ランダムで絵文字を生成する
*/
const createEmoji = () => {
  let emojiCode = randomRange(1, 10) > 7.75 ? Math.floor(randomRange(128512, 128592)) : Math.floor(randomRange(127744, 128318));
  return String.fromCodePoint(emojiCode);
};

/**
* log
* デバッグ用
* @param {string} title - 出力するデータの内容
* @param {any} data - 出力するデータ
*/
export const log = (title, data) => {
  let emoji = createEmoji();
  console.log(emoji + " " +  title + " :", data);
}