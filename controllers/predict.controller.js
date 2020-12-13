const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const image = require('get-image-data');
const fs = require('fs');
// npm install @tensorflow/tfjs@1.2.7 @tensorflow/tfjs-node@1.2.7 --save

exports.makePredictions = async (req, res, next) => {
  const imagePath = './images/test-image.jpg';
  try {
    const loadModel = async (img) => {
      const output = {};
      // laod model
      console.log('Loading.......')
      const model = await mobilenet.load();
      // classify
      output.predictions = await model.classify(img);
      console.log(output);
      res.statusCode = 200;
      res.json(output);
    };
    await image(imagePath, async (err, imageData) => {
      // pre-process image
      const numChannels = 3;
      const numPixels = imageData.width * imageData.height;
      const values = new Int32Array(numPixels * numChannels);
      const pixels = imageData.data;
      for (let i = 0; i < numPixels; i++) {
        for (let channel = 0; channel < numChannels; ++channel) {
          values[i * numChannels + channel] = pixels[i * 4 + channel];
        }
      }
      const outShape = [imageData.height, imageData.width, numChannels];
      const input = tf.tensor3d(values, outShape, 'int32');
      await loadModel(input);

      // delete image file
      fs.unlinkSync(imagePath, (error) => {
        if (error) {
          console.error(error);
        }
      });
    });
  } catch (error) {
    console.log(error)
  }
};