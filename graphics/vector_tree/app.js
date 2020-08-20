// import {Vector2D} from '../common/lib/vector2d.js';

// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');

// ctx.translate(0, canvas.height);
// ctx.scale(1, -1);
// ctx.lineCap = 'round';

// function drawBranch(context, v0, length, thickness, dir, bias) {
//   const v = new Vector2D().rotate(dir).scale(length);
//   const v1 = v0.copy().add(v);

//   context.lineWidth = thickness;
//   context.beginPath();
//   context.moveTo(...v0);
//   context.lineTo(...v1);
//   context.stroke();

//   if(thickness > 2) {
//     const left = Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5);
//     drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
//     const right = Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5);
//     drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
//   }

//   if(thickness < 5 && Math.random() < 0.3) {
//     context.save();
//     context.strokeStyle = '#c72c35';
//     const th = Math.random() * 6 + 3;
//     context.lineWidth = th;
//     context.beginPath();
//     context.moveTo(...v1);
//     context.lineTo(v1.x, v1.y - 2);
//     context.stroke();
//     context.restore();
//   }
// }

// const v0 = new Vector2D(256, 0);
// drawBranch(ctx, v0, 50, 10, 1, 3);

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const {width, height} = canvas;
ctx.translate(0.5 * width, 0.5 * height);
ctx.scale(1, -1);

function draw(points, strokeStyle = 'black', fillStyle = null) {
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(...points[0]);
  for(let i = 1; i < points.length; i++) {
    ctx.lineTo(...points[i]);
  }
  ctx.closePath();
  if(fillStyle) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  ctx.stroke();
}

// const TAU_SEGMENTS = 60;
// const TAU = Math.PI * 2;
// function arc(x0, y0, radius, startAng = 0, endAng = Math.PI * 2) {
//   const ang = Math.min(TAU, endAng - startAng);
//   const ret = ang === TAU ? [] : [[x0, y0]];
//   const segments = Math.round(TAU_SEGMENTS * ang / TAU);
//   for(let i = 0; i <= segments; i++) {
//     const x = x0 + radius * Math.cos(startAng + ang * i / segments);
//     const y = y0 + radius * Math.sin(startAng + ang * i / segments);
//     ret.push([x, y]);
//   }
//   return ret;
// }

const TAU_SEGMENTS = 60;
const TAU = Math.PI * 2;
function ellipse(x0, y0, radiusX, radiusY, startAng = 0, endAng = Math.PI * 2) {
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

draw(ellipse(0, 0, 100, 50));

// draw(arc(0, 0, 100));
