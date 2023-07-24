const sharp = require('sharp');
const fs = require('fs');

// 采用输入输出流（readableStream和writableStream）的创建和处理图像：适合处理大型图像或在服务器上处理多图像的情况
/**
 * 为什么要使用管道进行数据处理？

管道（pipe）是一种非常有效的数据处理方式，尤其适用于处理大型数据流。在图像处理中，使用管道可以将数据流从一个处理步骤传递到下一个处理步骤，而无需一次性加载和保存整个数据。这样做有以下好处：

内存效率：管道方式可以避免一次性加载整个图像到内存中，特别适用于处理大型图像，从而减少内存的占用。

时间效率：管道方式可以在处理过程中逐步处理数据，而无需等待整个数据加载完成。这样可以加快图像处理的速度。

并发处理：使用管道，可以同时处理多个图像或数据流，提高并发处理能力。

灵活性：使用管道方式可以轻松地将不同的处理步骤组合起来，实现更复杂的图像处理流程。
*/

// 输入图像文件路径
const inputImagePath = './input-images/input.jpeg';

// 输出图像文件路径
const outputImagePath = './output-images/output-test2.jpeg';

// 读取图像文件
const readableStream = fs.createReadStream(inputImagePath);

// 创建图像转换器
const transformer = sharp()
  .resize(300)
  .on('info', function (info) {
    console.log('Image height is ' + info.height);
  });

// 创建输出图像文件流
const writableStream = fs.createWriteStream(outputImagePath);

// 使用管道进行数据处理
readableStream.pipe(transformer).pipe(writableStream);

// 在数据处理完成后，输出提示信息
writableStream.on('finish', () => {
  console.log('Image processing completed.');
});
