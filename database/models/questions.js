const mongoose = require('mongoose');


const questionsSchema = mongoose.Schema({
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

module.exports.getQuestions = getQuestions;