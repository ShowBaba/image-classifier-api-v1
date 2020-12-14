const express = require('express');
const logger = require('morgan');
const cors = require('cors');


const app = express();
const corsOptions = {
  origin: '*',
};

app.use(logger('dev'));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Image Classifier API')
});

const predictRouter = require('./routes/predict.route')
app.use('/predict', predictRouter);

PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Running server at http://localhost:${PORT}`);