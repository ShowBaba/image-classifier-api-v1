const express = require('express');
const multer = require('multer');
const controller = require('../controllers/predict.controller');

// configure multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    callback(null, 'test-image.jpg');
  },
});

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('You can upload only image files'), false);
  }
  callback(null, true);
};

const upload = multer({ storage, fileFilter: imageFileFilter });

const router = express.Router();
router.route('/').post(upload.single('file'), controller.makePredictions);

module.exports = router;
