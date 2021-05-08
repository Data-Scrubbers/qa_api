const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc',
{ useNewURLParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongoose is connected!');})
  .catch(() => {
    console.log('Mongoose error');});

let sdc = mongoose.Schema({
  product_id: Number,
  results:[{
    _id: Number,
    question_id: Number,
    question_body: String,
    question_date: String,
    asker_name: String,
    asker_email: String,
    reported: Boolean,
    helpfulness: Number,
    answers: [{
      _id: Number,
      question_id: Number,
      body: String,
      date: String,
      answerer_name: String,
      answerer_email: String,
      reported: Boolean,
      helpfulness: Number,
      photos:[{
        _id: Number,
        answer_id: Number,
        url: String
      }]
    }]
  }]
}, {
  collection: 'questions'
});

let Questions = mongoose.model('Questions', sdc);


const getQuestions = (obj, cb) => {
  if (!obj.count && !obj.page) {
    Questions.find({product_id: obj.product_id}).limit(5).exec(cb);
  } else {
    Questions.find({product_id: obj.product_id}).limit(Number(obj.count)).exec(cb);
  }
}

const getAnswers = (qid, obj, cb) => {
  if (!obj.count && !obj.page) {
    Questions.find({question_id: qid}, {_id: 0, answers: 1}).limit(5).exec(cb);
  } else {
    Questions.find({question_id: qid}, {_id: 0, answers: 1}).limit(Number(obj.count)).exec(cb);
  }
}

module.exports.getQuestions = getQuestions;
module.exports.getAnswers = getAnswers;
