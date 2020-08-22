const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const {width, height} = canvas;
ctx.translate(0.5 * width, 0.5 * height);
ctx.scale(1, -1);

const TAU_SEGMENTS = 60;
const TAU = Math.PI * 2;
function arc(x0, y0, radiusX, radiusY, startAng = 0, endAng = Math.PI * 2) {
  const ang = Math.min(TAU, endAng - startAng);
  const ret = ang === TAU ? [] : [[x0, y0]];
  const segments = Math.round(TAU_SEGMENTS * ang / TAU);
  for(let i = 0; i <= segments; i++) {
    const x = x0 + radiusX * Math.cos(startAng + ang * i / segments);
    const y = y0 + radiusY * Math.sin(startAng + ang * i / segments);
    ret.push([x, y]);
  }
  return ret;
}

draw(arc(0, 0, 200, 100), ctx, {
  close: true
});