// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.security.imgSecCheck({
      media: {
        contentType: event.contentType,
        value: Buffer.from(event.buffer)
      }
    });
    return result
  } catch (err) {
    return err
  }
}