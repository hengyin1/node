const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const {width, height} = canvas;
const w = 0.5 * width,
  h = 0.5 * height;
ctx.translate(w, h);
ctx.scale(1, -1);

function regularShape(edges = 3, x, y, step) {
  const ret = [];
  const delta = Math.PI * (1 - (edges - 2) / edges);
  let p = new Vector2D(x, y);
  const dir = new Vector2D(step, 0);
  ret.push(p);
  for(let i = 0; i < edges; i++) {
    p = p.copy().add(dir.rotate(delta));
    ret.push(p);
  }
  return ret;
}

const points = regularShape(3, 128, 128, 100);
draw(points, ctx);


const {left: _left, top: _top} = canvas.getBoundingClientRect();

canvas.addEventListener('mousemove', (evt) => {
  const {x, y} = evt;
  // 坐标转换
  const offsetX = x - _left;
  const offsetY = y - _top;

  ctx.clearRect(-256, -256, 512, 512);

  if(ctx.isPointInPath(offsetX, offsetY)) {
    draw(points, ctx, {fillStyle: 'green'});
  } else {
    draw(points, ctx, {fillStyle: 'red'});
  }
});