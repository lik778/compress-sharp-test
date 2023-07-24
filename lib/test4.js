const sharp = require('sharp')
const fs  = require('fs')
const path = require('path')

const inputDirectory = path.join('../','input-images')

const imagePathList  = getImagesInputDirectory(inputDirectory)

Promise.all(imagePathList.map(processImage)).then(() => {
  console.log('All Image processed completed')
}).catch(e => {
  console.log('Images process Error:', e)
})


function processImage(item) {
  return new Promise((resolve,reject) => {
    const readableStream = fs.createReadStream(item)
    const transformer = sharp().png().on('info', (info) => {
      console.log(info)
    })
    const outputFileName = `processed_${path.basename(item, path.extname(item))}.png`
    const outputFilePath = path.join('../', 'output',outputFileName)
    const writableStream = fs.createWriteStream(outputFilePath)

    readableStream.pipe(transformer).pipe(writableStream)
    
    writableStream.on('finish', () => {
      console.log(`Image ${item} processed completed`)
      resolve(item)
    })
    readableStream.on('error', err => {
        reject(err);
      });
    writableStream.on('error', err => {
        reject(err);
      })
  })
}


function getImagesInputDirectory(inputDirectory) {
  const imageExtension = ['.png', '.jpg', '.jpeg', '.gif', '.webp']
  const imagePath  = []
  fs.readdirSync(inputDirectory).forEach(e => {
    const filePath  = path.join(inputDirectory,e)
    const fileExt = path.extname(filePath).toLowerCase()
    if(imageExtension.includes(fileExt)) {
      imagePath.push(filePath)
    }
  })
  return imagePath
}


