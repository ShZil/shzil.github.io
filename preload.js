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
      settings.update.picked = "Top";
    }
  },
  right: () => {
    if (settings.switcher.logChoice) {
      console.log("Right");
      settings.update.picked = "Right";
    }
  },
  left: () => {
    if (settings.switcher.logChoice) {
      console.log("Left");
      settings.update.picked = "Left";
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
  canvas.height = 350;
  const top = headerObjects[0];
  const right = headerObjects[1];
  const left = headerObjects[2];

  for (let i = 0; i < settings.header.starCount; i++) {
    top.push(new Star());
  }
}

function update() {
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
    for (let i = 0; i < headerObjects[0].length; i++) {
      headerObjects[0][i].update();
      headerObjects[0][i].render(ctx, canvas.width, canvas.height);
    }
  }
  ticks++;
}
