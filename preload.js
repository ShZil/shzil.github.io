function renderSwitcher() {
  const canvas = document.getElementById('switcher');
  const ctx = canvas.getContext('2d');

  drawBase(ctx);

  drawTop(ctx);

  drawLeft(ctx);

  drawRight(ctx);
}

function drawBase(ctx) {
  // Clear BG
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 300, 150);

  ctx.strokeStyle = 'white';
  // Horizontal
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(0, 75);
  ctx.lineTo(300, 75);
  ctx.stroke();

  // Vertical
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.moveTo(150, 75);
  ctx.lineTo(150, 150);
  ctx.stroke();
}

function drawTop(ctx) {
  let topGradient = ctx.createLinearGradient(110, 0, 200, 0);
  topGradient.addColorStop("0", "black");
  topGradient.addColorStop("1.0", "white");
  ctx.strokeStyle = topGradient;

  // A
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(55*2, 60);
  ctx.lineTo(75*2, 10);
  ctx.lineTo(95*2, 60);
  ctx.moveTo(63*2, 38);
  ctx.lineTo(87*2, 38);
  ctx.stroke();
}

function drawLeft(ctx) {
  let leftGradient = ctx.createLinearGradient(0, 0, 150, 75);
  leftGradient.addColorStop("0", "darkgreen");
  leftGradient.addColorStop("1.0", "lime");
  ctx.strokeStyle = leftGradient;

  // 0
  ctx.beginPath();
  ctx.ellipse(75, 110, 25, 23, 0, 0, 2 * Math.PI);
  ctx.moveTo(29*2, 127);
  ctx.lineTo(45*2, 89);
  ctx.stroke();
}

function drawRight(ctx) {
  let points = [
    {x: 10, y: 0},
    {x: 10, y: 10},
    {x: 10, y: 20},
    {x: 2, y: 5},
    {x: 2, y: 15},
    {x: 18, y: 5},
    {x: 18, y: 15}
  ];

  // Grass Block
  drawCubeFace(ctx, 75, 82, 3, points, 0, 5, 1, 3, "rgb(89, 151, 50)");
  drawCubeFace(ctx, 75, 82, 3, points, 3, 1, 2, 4, "rgb(177, 125, 86)");
  drawCubeFace(ctx, 75, 82, 3, points, 6, 5, 1, 2, "rgb(55, 38, 26)");
}

function drawCubeFace(ctx, x, y, scl, points, i, j, k, w, color) {
  ctx.fillStyle = color;

  let arr = transformCubeFace(points, x, y, scl);

  ctx.beginPath();
  ctx.moveTo(arr[i].x*2, arr[i].y);
  ctx.lineTo(arr[j].x*2, arr[j].y);
  ctx.lineTo(arr[k].x*2, arr[k].y);
  ctx.lineTo(arr[w].x*2, arr[w].y);
  ctx.closePath();
  ctx.fill();
}

function transformCubeFace(arr, xoff, yoff, scl) {
  let narr = [];
  for (let i = 0; i < arr.length; i++) {
    narr[i] = {
      x: arr[i].x * scl + xoff,
      y: arr[i].y * scl + yoff
    };
  }
  return narr;
}

const switcherClicked = () => {
  settings.update.interactedWith = true;
  const canvas = document.getElementById('switcher');
  const {clientX: x, clientY: y} = window.event;
  let isin = distanceSquared(x, y, canvas.offsetLeft, canvas.offsetTop + 75) < 150*150;
  let relative = mult(normallize({
    x: x - canvas.offsetLeft - 75,
    y: y - canvas.offsetTop - 75
  }), 150);
  if (settings.switcher.logClicks) {
    console.log(`Switcher Clicked: ${x - canvas.offsetLeft}, ${y - canvas.offsetTop}`);
  }
  if (relative.y < 0) {
    switcher.top();
  } else {
    if (relative.x < 0) {
      switcher.left();
    } else {
      switcher.right();
    }
  }
  const ctx = canvas.getContext('2d');
  renderSwitcher();
  ctx.lineWidth = 5;
  ctx.strokeStyle = settings.switcher.mouseTracker.color;
  ctx.beginPath();
  ctx.moveTo(150, 75);
  ctx.lineTo(2*(relative.x+75), relative.y+75);
  ctx.stroke();
};

const switcher = {
  top: () => {
    if (settings.switcher.logChoice) {
      console.log("Top");
      change(0);
    }
  },
  right: () => {
    if (settings.switcher.logChoice) {
      console.log("Right");
      change(1);
    }
  },
  left: () => {
    if (settings.switcher.logChoice) {
      console.log("Left");
      change(2);
    }
  }
};

function distanceSquared(x0, y0, x1, y1) {
  return (x0-x1)*(x0-x1) + (y0-y1)*(y0-y1);
}

function normallize(vector) {
  let factor = 1 / Math.sqrt(distanceSquared(0, 0, vector.x, vector.y));
  return {
    x: vector.x * factor, y: vector.y * factor
  };
}

function mult(vector, factor) {
  return {
    x: vector.x * factor, y: vector.y * factor
  };
}

function warp(val, range) {
  console.log(val + ", " + range);
  if (val < 0) return warp(val + range, range);
  if (val > range) return val % range;
  return val;
}

function stateString(num) {
  return (["Top", "Right", "Left"])[num];
}

function specialWarp(v) {
  if (v == 3) return 0;
  if (v == -1) return 2;
  return v;
}

function literalStateString(num) {
  return (["Atheism", "Minecraft", "Programming"])[specialWarp(num)];
}

function drawStar(ctx, x, y, z, o, a) {
  ctx.strokeStyle = `rgb(${o}, ${o}, ${o})`;
  ctx.lineWidth = settings.header.starRadius*2.1;
  {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a * 2 * Math.PI);
    ctx.translate(-x, -y);
    ctx.strokeRect(x-settings.header.starRadius, y-settings.header.starRadius, settings.header.starRadius * 2 * z, settings.header.starRadius * 2 * z);
    ctx.restore();
  }
}

var ticks = 0;
var headerObjects = [
  [], // Top
  [], // Right
  []  // Left
];

function init() {
  const canvas = document.getElementById('header-bg');
  canvas.width  = 1000;
  canvas.height = 300;
  const top = headerObjects[0];
  const right = headerObjects[1];
  const left = headerObjects[2];

  top.push(new UniverseBG());
  for (let i = 0; i < settings.header.starCount; i++) {
    top.push(new Star());
  }
}

function update() {
  ticks++;
  if (ticks % settings.update.continuity == 0) {
    let angle;
    if (settings.update.interactedWith) {
      return;
    } else {
      angle = ((ticks / 200) * settings.update.speed) % 360;
    }
    let {x, y} = {
      x: Math.cos(angle) * 150,
      y: Math.sin(angle) * 150
    };
    const canvas = document.getElementById('switcher');
    const ctx = canvas.getContext('2d');
    renderSwitcher();
    ctx.lineWidth = 5;
    ctx.strokeStyle = settings.switcher.mouseTracker.color;
    ctx.beginPath();
    ctx.moveTo(150, 75);
    ctx.lineTo(2*(x+75), y+75);
    ctx.stroke();
    if (ticks % (settings.update.continuity * 20) == 0) {
      if (y < 0) {
        switcher.top();
      } else {
        if (x < 0) {
          switcher.left();
        } else {
          switcher.right();
        }
      }
    }
  }
  if (ticks % settings.update.header == 0) {
    const canvas = document.getElementById('header-bg');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < headerObjects[stage].length; i++) {
      headerObjects[stage][i].update();
      headerObjects[stage][i].render(ctx, canvas.width, canvas.height);
    }
  }
}

var stage = 1;
function change(state) {
  if (state != stage) {
    console.log("From "+stateString(stage)+" To "+stateString(state));
    stage = state;
    const subtitle = document.querySelector(".header-text");
    subtitle.innerHTML = `${literalStateString(stage - 1)} | <b class="big stroke">${literalStateString(stage)}</b> | ${literalStateString(stage + 1)}`;
  }
}

// Perlin: http://asserttrue.blogspot.com/2011/12/perlin-noise-in-javascript_31.html
PerlinNoise = new function() {

this.noise = function(x, y, z) {

   var p = new Array(512)
   var permutation = [ 151,160,137,91,90,15,
   131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
   190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
   88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
   77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
   102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
   135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
   5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
   223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
   129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
   251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
   49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
   138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
   ];
   for (var i=0; i < 256 ; i++)
 p[256+i] = p[i] = permutation[i];

      var X = Math.floor(x) & 255,                  // FIND UNIT CUBE THAT
          Y = Math.floor(y) & 255,                  // CONTAINS POINT.
          Z = Math.floor(z) & 255;
      x -= Math.floor(x);                                // FIND RELATIVE X,Y,Z
      y -= Math.floor(y);                                // OF POINT IN CUBE.
      z -= Math.floor(z);
      var    u = fade(x),                                // COMPUTE FADE CURVES
             v = fade(y),                                // FOR EACH OF X,Y,Z.
             w = fade(z);
      var A = p[X  ]+Y, AA = p[A]+Z, AB = p[A+1]+Z,      // HASH COORDINATES OF
          B = p[X+1]+Y, BA = p[B]+Z, BB = p[B+1]+Z;      // THE 8 CUBE CORNERS,

      return scale(lerp(w, lerp(v, lerp(u, grad(p[AA  ], x  , y  , z   ),  // AND ADD
                                     grad(p[BA  ], x-1, y  , z   )), // BLENDED
                             lerp(u, grad(p[AB  ], x  , y-1, z   ),  // RESULTS
                                     grad(p[BB  ], x-1, y-1, z   ))),// FROM  8
                     lerp(v, lerp(u, grad(p[AA+1], x  , y  , z-1 ),  // CORNERS
                                     grad(p[BA+1], x-1, y  , z-1 )), // OF CUBE
                             lerp(u, grad(p[AB+1], x  , y-1, z-1 ),
                                     grad(p[BB+1], x-1, y-1, z-1 )))));
   }
   function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
   function lerp( t, a, b) { return a + t * (b - a); }
   function grad(hash, x, y, z) {
      var h = hash & 15;                      // CONVERT LO 4 BITS OF HASH CODE
      var u = h<8 ? x : y,                 // INTO 12 GRADIENT DIRECTIONS.
             v = h<4 ? y : h==12||h==14 ? x : z;
      return ((h&1) == 0 ? u : -u) + ((h&2) == 0 ? v : -v);
   }
   function scale(n) { return (1 + n)/2; }
}
