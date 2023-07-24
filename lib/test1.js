const sharp = require('sharp'); 

// 不同的控制可达到不同的效果
sharp('../input-images/WechatIMG9.jpeg', {
  failOn: 'warning', // 何时中止无效像素数据的处理，其中之一（按敏感度顺序）：“none”（最少）、“truncated(截断)”、“error”或“warning”（最多），较高级别意味着较低级别，无效元数据将始终中止。
  limitInputPixels: false, // 请勿处理像素数（宽度 x 高度）超过此限制的输入图像。假设输入元数据中包含的图像尺寸是可信的。整数像素数，零或 false 表示删除限制，true 表示使用默认限制
  unlimited: true, // 将此设置为true删除有助于防止内存耗尽的安全功能（JPEG、PNG、SVG、HEIF）
  sequentialRead: true,  // 将其设置为false使用随机访问而不是顺序读取。某些操作会自动执行此操作。
  animated: true, // 设置为true可读取动画图像（GIF、WebP、TIFF）的所有帧/页面，相当于设置pages为-1
})
  .resize(320).jpeg({ quality: 90 }).toFile('../output-images/output.jpeg', (err, info) => { 
      console.log(err)
      console.log(info)
  });