import { AwesomeQR, QRErrorCorrectLevel } from 'awesome-qr';
import { parse as parseQueries } from 'qs';

/**
 * @description Base64 转 Blob
 * @param {string} dataURL
 */
export function dataURLtoBlob(dataURL) {
  if (!dataURL) {
    console.error('转换失败：参数为空');
    return null;
  }
  try {
    let split = dataURL.split(',');
    let mime = split[0].match(/:(.*?);/)[1];
    let bstr = atob(split[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n-- > 0) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (error) {
    console.error('转换失败，可能是参数错误：');
    console.error(error);
    return null;
  }
}

/**
 * @description Base64 转 Image 对象
 * @param {string} dataURL
 * @returns {Promise<HTMLImageElement>}
 */
export function dataURLtoImage(dataURL) {
  if (!dataURL) {
    console.error('转换失败：参数为空');
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    const image = new Image();
    image.onerror = function () {
      console.error('转换失败：参数错误');
      resolve(null);
    }
    image.onload = function () {
      resolve(image);
    }
    image.src = dataURL;
  });
}

/**
 * @description 生成二维码
 * @param {object} opts
 * @param {string} opts.colorBackground
 * @param {string} opts.colorForeground
 * @param {number} opts.margin
 * @param {number} opts.size
 * @param {string} opts.text
 * @returns {Promise<{
 *   error: Error;
 *   result: string;
 *   success: boolean;
 * }>}
 */
export async function generateQRCode(opts = {}) {

  const {
    colorBackground = '#FFFFFF',
    colorForeground = '#000000',
    margin = 10,
    size = 256,
    text = '',
  } = opts;

  // 注意：
  // 由于生成的二维码内容区域存在白色背景，
  // 导致自定义背景颜色无法正常生效，
  // 因此需要手动通过替换颜色的方式进行修改。

  return new AwesomeQR({
    autoColor: false,
    colorDark: '#000000',
    colorLight: '#FFFFFF',
    components: {
      alignment: {
        scale: 1,
        protectors: false,
      },
      cornerAlignment: {
        scale: 1,
        protectors: true,
      },
      data: {
        scale: 1,
      },
      timing: {
        scale: 1,
        protectors: false,
      },
    },
    correctLevel: QRErrorCorrectLevel.M,
    margin,
    size,
    text,
    whiteMargin: false,
  }).draw().then((dataURL) => {

    if (!dataURL) {
      return {
        error: new Error('生成结果为空'),
        result: null,
        success: false,
      };
    }

    // 转换颜色
    const bgc = getColorRGBA(colorBackground);
    const fgc = getColorRGBA(colorForeground);

    // 创建画布
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = size;
    canvas.height = size;

    return dataURLtoImage(dataURL).then((image) => {

      if (image) {
        ctx.drawImage(image, 0, 0);
      } else {
        return null;
      }

      // 获取像素数据
      let imageData = ctx.getImageData(0, 0, size, size);
      // 颜色数据：[R, G, B, A, R, G, B, A, ...]
      let data = imageData.data;

      // 替换颜色
      for (let i = 0; i < data.length; i += 4) {
        let r = data[i], g = data[i + 1], b = data[i + 2];
        let s = r + g + b;
        switch (s) {
          // 背景颜色（白）
          case 765:
            data[i] = bgc[0];
            data[i + 1] = bgc[1];
            data[i + 2] = bgc[2];
            data[i + 3] = 255;
            break;
          // 内容颜色（黑）
          case 0:
            data[i] = fgc[0];
            data[i + 1] = fgc[1];
            data[i + 2] = fgc[2];
            data[i + 3] = 255;
            break;
          // 内容颜色（半透明）
          default:
            data[i] = fgc[0];
            data[i + 1] = fgc[1];
            data[i + 2] = fgc[2];
            data[i + 3] = 128;
            break;
        }
      }

      // 绘制
      ctx.putImageData(imageData, 0, 0);

      // 继续处理
      return dataURLtoImage(canvas.toDataURL('image/png'));

    }).then((image) => {
      if (image) {
        // 填充底色
        ctx.fillStyle = colorBackground;
        ctx.fillRect(0, 0, size, size);
        ctx.drawImage(image, 0, 0);
        return {
          error: null,
          result: canvas.toDataURL('image/png'),
          success: true,
        };
      } else {
        return {
          error: null,
          result: null,
          success: false,
        };
      }
    });

  }).catch((error) => {
    return {
      error: error,
      result: null,
      success: false,
    };
  });

}

/**
 * @description 颜色字符串转 RGBA
 * @param {string} colorStr
 */
export function getColorRGBA(colorStr) {

  if (!colorStr) {
    console.error('转换失败：缺少参数');
    return [0, 0, 0, 0];
  }

  let canvas = document.createElement('canvas');
  let ctx = null;

  canvas.width = 1;
  canvas.height = 1;

  ctx = canvas.getContext('2d')
  ctx.fillStyle = colorStr;
  ctx.fillRect(0, 0, 1, 1);

  try {
    let { data } = ctx.getImageData(0, 0, 1, 1);
    return [data[0], data[1], data[2], data[3]];
  } catch (error) {
    console.error('转换失败：');
    console.error(error);
    return [0, 0, 0, 0];
  }

}

/**
 * @description 获取当前页面 URL 的查询参数
 * @returns {{
 *   readonly: '0'|'1';
 *   text: string;
 * }}
 */
export function getURLQueries() {

  const queries = location.search;
  const parsed = parseQueries(queries, {
    charset: 'utf-8',
    ignoreQueryPrefix: true,
  });

  return parsed;

}
