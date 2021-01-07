function renderSwitcher() {
  const canvas = document.getElementById('switcher');
  const ctx = canvas.getContext('2d');

  drawBase(ctx);

  drawTop(ctx);

  drawLeft(ctx);
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
  let leftGradient = ctx.createLinearGradient(0, 0, 150, 0);
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

const switcherClicked = () => {
  const canvas = document.getElementById('switcher');
  const {clientX: x, clientY: y} = window.event;
  let isin = distanceSquared(x, y, canvas.offsetLeft, canvas.offsetTop + 75) < 150*150;
  let relative = mult(normallize({
    x: x - canvas.offsetLeft - 75,
    y: y - canvas.offsetTop - 75
  }), 150);
  if (settings.switcher.logClicks) {
    console.log(`${x - canvas.offsetLeft}, ${y - canvas.offsetTop}`);
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
    }
  },
  right: () => {
    if (settings.switcher.logChoice) {
      console.log("Right");
    }
  },
  left: () => {
    if (settings.switcher.logChoice) {
      console.log("Left");
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
