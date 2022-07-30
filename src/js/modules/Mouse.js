class Mouse {
  constructor() {
    this.position = { x: 0, y: 0 };
    this.start = { x: 0, y: 0 };
    this.isDown = false;
    this.bind();
  }

  bind() {
    window.addEventListener("mousemove", this.handleMouseMove.bind(this));
    window.addEventListener("mousedown", this.handleMouseDown.bind(this));
    window.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  /**
   * マウスを動かした時の初めの座標をセット
   * @param {event} - event
   */
  setMousePosition(e) {
    this.position.x = e.clientX;
    this.position.y = e.clientY;
  }

  /**
   * マウスを動かした時の初めの座標をセット
   * @param {event} - event
   */
  setMouseStartPosition(e) {
    this.start.x = e.clientX;
    this.start.y = e.clientY;
  }

  /**
   * マウスを動かした時の処理
   * @param {event} - event
   */
  handleMouseMove(e) {
    this.setMousePosition(e);
  }

  /**
   * マウスを押下した時の処理
   * @param {event} - event
   */
  handleMouseDown(e) {
    if (this.isDown) return;
    this.isDown = true;
    this.setMouseStartPosition(e);
  }

  /**
   * マウスを離した時の処理
   * @param {event} - event
   */
  handleMouseUp(e) {
    this.escape();
  }

  /**
   * マウスダウンフラグ解除
   * @param {event} - event
   */
  escape() {
    this.isDown = false;
  }
}

export const mouse = new Mouse();
