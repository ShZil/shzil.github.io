function renderSwitcher() {
  const canvas = document.getElementById('switcher');
  const ctx = canvas.getContext('2d');
  console.log(ctx);
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
}

const switcherClicked = () => {
  const canvas = document.getElementById('switcher');
  const {clientX: x, clientY: y} = window.event;
  let isin = distanceSquared(x, y, canvas.offsetLeft + 75, canvas.offsetTop + 75) < 150*150;
};

function distanceSquared(x0, y0, x1, y1) {
  return (x0-x1)*(x0-x1) + (y0-y1)*(y0-y1);
}
