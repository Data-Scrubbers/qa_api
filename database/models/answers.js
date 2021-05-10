const mongoose = require('mongoose');

const answersSchema = mongoose.Schema({
  question_id: Number,
  results:[{
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
}, {
  collection: 'questions'
});

let Answers = mongoose.model('Answers', answersSchema);

const getAnswers = (qid, obj, cb) => {
  if (!obj.count && !obj.page) {
    Questions.find({question_id: qid}, {_id: 0, answers: 1}).limit(5).exec(cb);
  } else {
    Questions.find({question_id: qid}, {_id: 0, answers: 1}).limit(Number(obj.count)).exec(cb);
  }
}

module.exports.getAnswers = getAnswers;