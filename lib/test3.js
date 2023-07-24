const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

// 生成图像
sharp({
  create: {
    width: 300,
    height: 200,
    channels: 4, // 新图像的通道数，这里设置为4，表示使用RGBA格式
    background: { r: 255, g: 0, b: 0, alpha: 0.5 } //  新图像的背景颜色，使用包含r、g、b和alpha属性的对象来表示颜色，这里设置为红色（r: 255, g: 0, b: 0）并设置透明度为0.5。
  }
})
.png()
.toBuffer()
.then(buffer => {
  // 将图像Buffer保存为文件
  fs.writeFile(path.resolve('../','./output-images/newImage.png'), buffer, err => {
    if (err) {
      console.error('Error saving image:', err);
    } else {
      console.log('New image saved successfully.');
    }
  });
})
.catch(err => {
  console.error('Image processing error:', err);
});
