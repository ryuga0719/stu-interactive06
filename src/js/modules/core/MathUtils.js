/**
 * valueをbaseに入れた値で四捨五入する
 * @param {number} value - 四捨五入する数値
 * @param {number} base - 四捨五入する桁数(小数第一位なら10を代入)
 * @return {number} 桁整理した数字
 */
export const orgRound = (value, base) => {
  return Math.round(value * base) / base;
};

/**
 * [a, b]間に存在するxを[c, d]間に線形補間した時の値を返す。
 * @param {number} x - 元々の数
 * @param {number} a - 元々の範囲の下限
 * @param {number} b - 元々の範囲の上限
 * @param {number} c - 新しい範囲の下限
 * @param {number} d - 新しい範囲の上限
 * @return {number} 補間後の値
 */
export const lerp = (x, a, b, c, d) => {
  return ((x - a) * (d - c)) / (b - a) + c;
};

/**
 * 入力値が最小・最大値を超えないように打ち止めされた値を返す。
 * @param {number} x - 入力値
 * @param {number} minValue - 最小値
 * @param {number} maxValue - 最大値
 * @return {number} clamp後の値
 */
export const clamp = (x, minValue, maxValue) => {
  return Math.max(Math.min(x, maxValue), minValue);
};

/**
 * 加速度を算出する
 * @param {number} distance - 区間
 * @param {number} time - 時間
 * @return {number} 加速度
 */
export const calculateAcceleration = (distance, time) => {
  const acceleration = distance / time;
  return orgRound(acceleration, 10);
};

/**
 * 度数 → ラジアンに変換
 * @param {number} val - 度数
 * @return {number} ラジアン
 */
export const degree2Radian = (val) => {
  return (val * Math.PI) / 180;
};

/**
 * ラジアン → 度数に変換
 * @param {number} val - ラジアン
 * @return {number} 度数
 */
export const radian2Degree = (val) => {
  return (val * 180) / Math.PI;
};

/**
 * min<=x<=maxの範囲でランダム値を生成できる
 * @param {number} min - ランダム値の最小値
 * @param {number} max - ランダム値の最大値
 * @return {number} 指定範囲のランダム値
 */
export const randomRange = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

/**
 * 値を0 ~ 1の範囲に正規化する
 * @param {number} x - 正規化する値
 * @param {number} max - 正規化するデータの最大値
 * @param {number} min - 正規化するデータの最小値
 * @return {number} 正規化後の値
 */
export const normalize = (x, max, min) => {
  return (x - min) / (max - min);
};
