function renderSwitcher() {
  const canvas = document.getElementById('switcher');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 300, 150);

  ctx.strokeStyle = 'white';

  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(0, 75);
  ctx.lineTo(300, 75);
  ctx.stroke();

  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.moveTo(150, 75);
  ctx.lineTo(150, 150);
  ctx.stroke();

  // ctx.drawImage(document.getElementById("A"), 10, 10, 80, 80);
  console.log(document.getElementById("A"));
}

const switcherClicked = () => {
  const canvas = document.getElementById('switcher');
  const {clientX: x, clientY: y} = window.event;
  let isin = distanceSquared(x, y, canvas.offsetLeft, canvas.offsetTop + 75) < 150*150;
  let relative = mult(normallize({
    x: x - canvas.offsetLeft - 75,
    y: y - canvas.offsetTop - 75
  }), 150);
  console.log(relative);
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
  ctx.strokeStyle = 'lime';
  ctx.beginPath();
  ctx.moveTo(150, 75);
  ctx.lineTo(2*(relative.x+75), relative.y+75);
  ctx.stroke();
};

const switcher = {top: () => {}, right: () => {}, left: () => {}};

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
