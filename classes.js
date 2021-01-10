class Star {
  constructor() {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    this.a = Math.random();
    this.o = 255 * Math.random();
  }

  render(ctx, w, h) {
    drawStar(ctx, this.x*w, this.y*h, this.o, this.a);
  }

  update() {
    this.a += 0.01;
    this.o--;

    this.a %= 1;
    if (this.o < 0) {
      this.x = Math.random();
      this.y = Math.random();
      this.a = Math.random();
      this.o = 255 * Math.random();
    }
  }
}
