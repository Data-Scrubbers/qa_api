const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/qa_sdc',
{ useNewURLParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongoose is connected!');})
  .catch(() => {
    console.log('Mongoose error');});

let getQuestions = (cb) => {
  db.questions.find().pretty().limit(5).exec(cb);
}

module.exports.getQuestions = getQuestions;
