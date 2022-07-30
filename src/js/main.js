import { degree2Radian, normalize, orgRound } from "./modules/core/MathUtils";
import gsap from "gsap";
import $ from "jquery";
import Pull from "./modules/Pull";
import { mouse } from "./modules/Mouse";
import { FRACTION, EASING } from "./const/index";

// ターゲットの情報
let target = {
  element: $(".js-tg"),
  x: 0,
  y: 0,
};

// マウスの移動距離
let mouseDist = {
  x: 0,
  y: 0,
};

// 初期設定
init();
// doAnimation();

/**
 * 初期実行
 */
function init() {
  $(".js-tg").on("mousedown", function () {
    target.element = $(this);
  });
  animate();
}

/**
 * アニメーション
 */
function animate() {
  if (mouse.isDown) {
    // マウス押下時からのマウス移動量を計算
    mouseDist.x = calcDiff(mouse.position.x, mouse.start.x);
    mouseDist.y = calcDiff(mouse.position.y, mouse.start.y);

    // 摩擦係数追加
    mouseDist.x = addFraction(mouseDist.x);
    mouseDist.y = addFraction(mouseDist.y);
  } else {
    // マウスを押下していない時はmouseDistをreset
    resetMouseDist();
  }

  // マウスとターゲットとの距離を計算
  const targetDiffX = calcDiff(mouseDist.x, target.x);
  const targetDiffY = calcDiff(mouseDist.y, target.y);

  // イージング付与
  target.x += addEasing(targetDiffX);
  target.y += addEasing(targetDiffY);

  // ユークリッド距離を計算
  const dist = Math.hypot(target.x, target.y);

  // 正規化
  const normalizedDist = normalize(dist, 700, 0); // distを正規化
  const truncatedDist = truncate(normalizedDist); // 正規化条件の追加
  let colorScale = convertColorScale(truncatedDist); // カラースケールに調整
  colorScale = orgRound(colorScale, 1); // 四捨五入

  // ターゲットをアニメーション
  doGsap(colorScale);

  // requestAnimationFrame実行
  doAnimation();
}

/**
 * gsapのアニメーションを実行する
 * @param {number} - scalableDist rgb値を調整する値
 */
function doGsap(colorScale) {
  gsap.to(target.element, {
    rotationZ: degree2Radian(target.x * target.y) * 0.1,
    rotationX: degree2Radian(target.x * target.y) * 0.1,
    rotationY: degree2Radian(target.x * target.y) * 0.1,
    x: target.x,
    y: target.y,
    backgroundColor: `rgba(${colorScale},0,0,1)`,
  });
}

/**
 * アニメーションの継続実行
 */
function doAnimation() {
  window.requestAnimationFrame(animate);
}

/**
 * 値が1を超えたら1にする
 * @param {number} val - 検査する値
 * @returns {number} truncateした値
 */
function truncate(val) {
  if (val <= 1) return val;
  return 1;
}

/**
 * 0~1の値を0~255に変換
 * @param {number} val - 変換する値
 * @returns {number} 変換後の値
 */
function convertColorScale(val) {
  return val * 255;
}

/**
 * 差分を計算
 * @param {number} x1 - 値1
 * @param {number} x2 - 値2
 * @returns {number} 差分
 */
function calcDiff(x1, x2) {
  return x1 - x2;
}

/**
 * 引数の値に摩擦係数を追加して返す
 * @param {number} val - 摩擦係数を掛ける値
 * @returns {number} 摩擦係数をかけた値
 *
 */
function addFraction(val) {
  return val * FRACTION;
}

/**
 * 引数の値にイージングを追加して返す
 * @param {number} val - イージングを掛ける値
 * @returns {number} イージングをかけた値
 *
 */
function addEasing(val) {
  return val * EASING;
}

/**
 * mouseDistを初期化
 */
function resetMouseDist() {
  mouseDist.x = 0;
  mouseDist.y = 0;
}

// test用
// const elements = $(".js-tg");
// const pull = new Pull(elements);
