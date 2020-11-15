import { getImageInfo, render } from './util.js'

const imageDataContext = new Map();
export const grayscale = async (src, canvasId = 'pixel') => {
  let context;
  if (imageDataContext.has(canvasId)) {
    context = imageDataContext.get(canvasId);
  } else {
    context = wx.createCanvasContext(canvasId);
    imageDataContext.set(canvasId, context);
  }

  try {
    const { width, height, path } = await getImageInfo(src);

    context.drawImage(path, 0, 0, width, height);
    await render(context);

    let imgData = await getImageData({ canvasId, width, height });

    traverse(imgData, ({ r, g, b, a }) => {
      let v = 0.212 * r + 0.714 * g + 0.074 * b;
      r = v;
      g = v;
      b = v;
      a = v > 110 ? 0 : a;
      
      return [r, g, b, a];
    })

    return await putImageData(canvasId, imgData);
  } catch (error) {
    return Promise.reject(error || '');
  }
}

const traverse = (imageData, pass) => {
  const { width, height, data } = imageData;
  for(let i = 0; i < width * height * 4; i += 4) {
    const [r, g, b, a] = pass({
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
      a: data[i + 3],
      index: i,
      width,
      height,
      x: ((i / 4) % width) / width,
      y: Math.floor(i / 4 / width) / height});

    data.set([r, g, b, a].map(v => Math.round(v)), i);
  }
  return imageData;
}

const getImageData  = ({ canvasId, x = 0, y = 0, width = 100, height = 100 }) => {
  return new Promise((resolve, reject) => {
    wx.canvasGetImageData({
      canvasId: canvasId,
      x: x,
      y: y,
      width: width,
      height: height,
      success: res => {
        resolve(res);
      },
      fail: () => {
        reject();
      }
    })
  })
}

const putImageData = (canvasId, imageData) => {
  return new Promise((resolve, reject) => {
    const { width, height, data } = imageData;
    wx.canvasPutImageData({
      canvasId: canvasId,
      x: 0,
      y: 0,
      width: width,
      height: height,
      data: data,
      success: res => {
        console.log('putImageData', res);
        resolve();
      },
      fail: () => {
        reject();
      }
    })
  })
}