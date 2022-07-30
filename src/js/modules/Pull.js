import { degree2Radian, normalize } from "./core/MathUtils";
import gsap from "gsap";
import $ from "jquery";

export default class Pull {
  constructor(el) {
    // ターゲットの情報
    this.target = {
      element: el,
      x: 0, // x param
      y: 0, // y param
    };

    // マウスの情報
    this.mouse = {
      isDown: false, // マウスダウンしているか
      x: 0, // マウス位置 X
      y: 0, // マウス位置 Y
      start: { x: 0, y: 0 }, // マウスダウン時の座標
      dist: { x: 0, y: 0 }, // マウスダウンしてからの移動距離
    };
    this.#init();
    this.#doAnimation();
  }

  #init() {
    $(window)
      .on("mousemove", this.#setMousePosition.bind(this))
      .on("mousedown", this.#mouseDown.bind(this))
      .on("mouseup", this.#escape.bind(this));
  }

  #animate() {
    if (this.mouse.isDown) {
      // マウス押してるときは、マウスダウン時からのマウス移動量をちゃんと計算
      this.mouse.dist.x = this.mouse.x - this.mouse.start.x;
      this.mouse.dist.y = this.mouse.y - this.mouse.start.y;

      const friction = 0.5; // 摩擦係数
      this.mouse.dist.x *= friction;
      this.mouse.dist.y *= friction;
    } else {
      // マウス押してないときの移動量は0
      this.mouse.dist.x = 0;
      this.mouse.dist.y = 0;
    }

    // 滑らかに移動させるためイージングつける
    const ease = 0.125; // イージング量
    this.target.x += (this.mouse.dist.x - this.target.x) * ease;
    this.target.y += (this.mouse.dist.y - this.target.y) * ease;
    const dist = Math.hypot(this.target.x, this.target.y);

    // 正規化
    const normalizedDist = normalize(dist, 700, 0); // distを正規化
    const truncatedDist = this.#truncate(normalizedDist); // 正規化条件の追加
    const scalableDist = truncatedDist * 255; // カラースケールに調整

    // ターゲットの移動量を更新
    gsap.to(this.target.element, {
      rotationX: degree2Radian(this.target.x * this.target.y) * 0.1,
      rotationY: degree2Radian(this.target.x * this.target.y) * 0.1,
      rotationZ: degree2Radian(this.target.x * this.target.y) * 0.1,
      x: this.target.x,
      y: this.target.y,
      backgroundColor: `rgba(${scalableDist},0,0,1)`,
    });

    this.#doAnimation();
  }

  // requestAnimationFrame実行
  #doAnimation() {
    window.requestAnimationFrame(this.#animate.bind(this));
  }

  /**
   * マウス座標のセット
   * @param {event} - event
   */
  #setMousePosition(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }

  /**
   * マウスを動かした時の初めの座標をセット
   * @param {event} - event
   */
  #setMouseStartPosition(e) {
    this.mouse.start.x = e.clientX;
    this.mouse.start.y = e.clientY;
  }

  /**
   * マウスを押下した時の処理
   * @param {event} - event
   */
  #mouseDown(e) {
    if (this.mouse.isDown) return;
    this.mouse.isDown = true;
    this.#setMouseStartPosition(e);
  }

  /**
   * マウスを離した時の処理
   * @param {event} - event
   */
  #escape(e) {
    this.mouse.isDown = false;
  }

  /**
   * 値が1を超えたら1にする
   * @param {number} val - 検査する値
   * @returns {number} truncateした値
   */
  #truncate(val) {
    if (val <= 1) return val;
    return 1;
  }
}
