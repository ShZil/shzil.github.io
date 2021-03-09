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
  constructor(mode, darkness, ratio) {
    this.res = 7; // Resize the UniverseBG to fit the canvas.
    this.w = 270; // Width
    this.h = this.w * ratio; // Height
    this.darken = 255 * darkness / 100; // 255 - true color, 0 - black
    this.dim = [5, 1.4285, 0]; // The perlin Z component with relation to color
    this.v = 0.05; // The speed at which this.dim[0, 1, 2] change.
    this.mode = mode; // Color Mode, i.e. [1, 1, 1] for true color and [0, 1, 0] for lime.
  }

  update() {
    this.pixels = [];

    const sizei = 1/this.w;
    const sizej = 1/this.h;
    this.dim[0] += this.v;
    this.dim[1] += this.v;
    this.dim[2] += this.v;

    for (let i = 0; i < this.w; i++) {
      this.pixels[i] = [];
      for (let j = 0; j < this.h; j++) {
        this.pixels[i][j] = [];
        for (let rgb = 0; rgb < 3; rgb++) {
          this.pixels[i][j][rgb] = PerlinNoise.noise(sizei*i, sizej*j, rgb*this.dim[rgb])
          * this.darken
          * this.mode[rgb];
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

class BinaryColumn {
    constructor(x) {
      this.x = x;
      this.y = -50 * Math.random();
      this.column = [];
      var height = 15 + 20 * Math.random();
      for (let i = 0; i < height; i++) {
          this.column[i] = Math.random() > 0.5 ? '0' : '1';
      }
    }

    render(ctx, w, h) {
      for (let i = 0; i < this.column.length; i++) {
          drawChar(ctx, this.column[i], this.x, this.y + settings.header.binaryWidth * i, 35, 'rgba(0, 160, 0, ' + (Math.random() * 70) + ')', 0.5);
      }
    }

    update() {

    }
}
