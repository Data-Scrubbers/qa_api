const mongoose = require('mongoose');

const answersSchema = mongoose.Schema({
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
}, {
  collection: 'answers'
});


const Answers = mongoose.model('Answers', answersSchema);

const getAnswers = (qid, obj, cb) => {
  if (!obj.count && !obj.page) {
    Answers.find({question_id: qid}).limit(5).exec(cb);
  } else {
    Answers.find({question_id: qid}).limit(Number(obj.count)).exec(cb);
  }
}

const markHelpful = (aid, cb) => {
  const filter = {_id: aid};
  const update = {helpfulness: + 1};
  Answers.findOneAndUpdate(filter, update).exec(cb);
}

const report = (aid, cb) => {
  const filter = {question_id: aid};
  const update = {reported: true};
  Answers.findOneAndUpdate(filter, update).exec(cb);
}

const count = 1048577;
const addAnswer = (qid, params, cb) => {
  const numAnswers = Answers._id;
  console.log('this is numAnswers: ', numAnswers);
  Answers.create({
    _id: count,
    question_id: qid,
    body: params[0],
    date: Date(),
    answerer_name: params[1],
    answerer_email: params[2],
    reported: false,
    helpfulness: 0,
    photos:[{
      answer_id: count,
      url: params[3]
    }]
  });
  count++;
}

module.exports.getAnswers = getAnswers;
module.exports.answersSchema = answersSchema;
module.exports.answersModel = Answers;
module.exports.addAnswer = addAnswer;
module.exports.markHelpful = markHelpful;
module.exports.report = report;