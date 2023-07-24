const sharp = require('sharp')
const path = require('path')

// 生成文本图片

const outputName  = 'text_helloword.png'
const outputPath  = path.join('../','output',outputName)
const input = Uint8Array.from([255, 255, 255, 0, 0, 0]);


const test = async () => {
  await sharp({
    text: {
      text: '<span foreground="red">Red!</span><span background="cyan">blue</span>',
      font: 'sans',
      rgba: true,
      dpi: 300
    }
    // text: {
    //   text: 'Hello, world!',
    //   width: 800, // max width
    //   height: 400 // max height
    // }
    // create: {
    //   width: 300,
    //   height: 200,
    //   channels: 3,
    //   noise: {
    //     type: 'gaussian',
    //     mean: 128,
    //     sigma: 30
    //   }
    // }
    // raw: {
    //   width: 2,
    //   height: 1,
    //   channels: 3
    // }
  }).toFile(outputPath)
}

test()