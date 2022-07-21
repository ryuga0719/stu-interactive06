import { log } from "./modules/core/Debug";
import { degree2Radian, reverseFlg } from "./modules/core/MathUtils";
import gsap from "gsap";
import $ from "jquery";

// ターゲットの移動量
let param = {
  x: 0,
  y: 0,
};

// マウス
let mouse = {
  isDown: false, // 画面押されてるか
  x: 0, // マウス位置 X
  y: 0, // マウス位置 Y
  start: { x: 0, y: 0 }, // マウスダウン時の座標
  dist: { x: 0, y: 0 }, // マウスダウンしてからの移動距離
};

// 初期のターゲット
let tg = $(".js-tg");

// 初期設定
init();
function init() {
  $(window)
    .on("mousemove", mouseMove)
    .on("mousedown", mouseDown)
    .on("mouseup", mouseUp);
  $(".js-tg").on("mousedown", function (e, v) {
    tg = $(this);
  });
  update();
}

// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {
  // let tg = $(".js-tg");

  if (mouse.isDown) {
    // マウス押してるときは、マウスダウン時からのマウス移動量をちゃんと計算
    mouse.dist.x = mouse.x - mouse.start.x;
    mouse.dist.y = mouse.y - mouse.start.y;

    let friction = 0.9; // 摩擦係数
    mouse.dist.x *= friction;
    mouse.dist.y *= friction;
  } else {
    // マウス押してないときの移動量は0
    mouse.dist.x = 0;
    mouse.dist.y = 0;
  }

  // 滑らかに移動させるためイージングつける
  let ease = 0.125; // イージング量 小さいとゆっくり
  param.x += (mouse.dist.x - param.x) * ease;
  param.y += (mouse.dist.y - param.y) * ease;

  // ターゲットの移動量を更新
  // if (mouse.isDown) {
  // }
  gsap.to(tg, {
    rotationZ: degree2Radian(param.x * param.y) * 0.1,
    x: param.x,
    y: param.y,
  });

  window.requestAnimationFrame(update);
}

/**
 * マウスを動かした時の処理
 * @param {event} - event
 */
function mouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

/**
 * マウスを押下した時の処理
 * @param {e} - event
 */
function mouseDown(e) {
  if (!mouse.isDown) {
    mouse.isDown = reverseFlg(mouse.isDown);
    mouse.start.x = e.clientX;
    mouse.start.y = e.clientY;
  }
}

/**
 * マウスを離した時の処理
 * @param {e} - event
 */
function mouseUp(e) {
  mouse.isDown = reverseFlg(mouse.isDown);
}
