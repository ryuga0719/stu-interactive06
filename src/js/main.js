import { log } from "./modules/core/Debug";
import gsap from "gsap";

// ターゲットの移動量
param = {
  x: 0,
  y: 0,
};

// マウス
mouse = {
  isDown: false, // 画面押されてるか
  x: 0, // マウス位置 X
  y: 0, // マウス位置 Y
  start: { x: 0, y: 0 }, // マウスダウン時の座標
  dist: { x: 0, y: 0 }, // マウスダウンしてからの移動距離
};
