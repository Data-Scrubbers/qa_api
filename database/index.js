const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/sdc';

const db = mongoose.connect(mongoURI, { useNewURLParser: true, useUnifiedTopology: true })


db
  .then(() => {
    console.log('Mongoose is connected!');
  })
  .catch(() => {
    console.log('Mongoose error');});



module.exports = db;

