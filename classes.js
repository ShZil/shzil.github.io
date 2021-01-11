class Star {
  constructor() {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    this.a = Math.random();
    this.o = 255 * Math.random();
  }

  render(ctx, w, h) {
    drawStar(ctx, this.x*w, this.y*h, this.z, this.o, this.a);
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

class UniverseBG {
  constructor() {
    this.w = 350;
    this.h = 100;
    this.res = 3;
    this.darken = 15;
    this.dim = [5, 5, 0];
  }

  update() {
    this.pixels = [];

    const sizei = 1/this.w * this.dim[0];
    const sizej = 1/this.h * this.dim[1];
    this.dim[2] += 0.02;

    for (let i = 0; i < this.w; i++) {
      this.pixels[i] = [];
      for (let j = 0; j < this.h; j++) {
        this.pixels[i][j] = [];
        for (let rgb = 0; rgb < 3; rgb++) {
          this.pixels[i][j][rgb] = PerlinNoise.noise(sizei*i, sizej*j, rgb*this.dim[2]) * this.darken;
        }
      }
    }
  }

  render(ctx, w, h) {
    for (let i = 0; i < this.w; i++) {
      for (let j = 0; j < this.h; j++) {
        const p = this.pixels[i][j];
        ctx.fillStyle = `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
        ctx.fillRect(i * this.res, j * this.res, this.res, this.res);
      }
    }
  }
}
