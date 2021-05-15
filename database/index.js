const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');
const mongoURI = 'mongodb://18.116.41.196:27017/sdc';

const db = mongoose.connect(mongoURI, { useNewURLParser: true, useUnifiedTopology: true })


db
  .then(() => {
    console.log('Mongoose is connected!');
  })
  .catch((error) => {
    console.log('Mongoose error: ', error);});

const AutoIncrement = AutoIncrementFactory(db);

module.exports = db;

