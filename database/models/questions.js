const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const answer = require('./answers')

const questionsSchema = mongoose.Schema({
    question_id: Number,
    product_id: Number,
    question_body: String,
    question_date: String,
    asker_name: String,
    asker_email: String,
    reported: Boolean,
    helpfulness: Number,

}, {
  collection: 'questions'
});
questionsSchema.plugin(AutoIncrement, {inc_field: 'question_id', start_seq: 1048576});
let Questions = mongoose.model('Questions', questionsSchema);


const getQuestions = (product_id, page, count, cb) => {
  if (!count && !page) {
    Questions.aggregate([
      { $match: { product_id: Number(product_id) } },
      {$limit: 5},
      { $lookup: {
          from: 'answers',
          localField: 'question_id',
          foreignField: 'question_id',
          as: 'answers'
        }
      },

    ]).explain(cb);
  } else {
    Questions.find({product_id: product_id}).limit(Number(count)).populate('answers').exec(cb);
  }
}

const addQuestion = (query, cb) => {
  Questions.create({
    product_id: query.product_id,
    question_body: query.body,
    question_date: Date(),
    asker_name: query.name,
    asker_email: query.email,
    reported: false,
    helpfulness: 0,
  }, (err, data) => {
    if (err) console.log(err);
    cb();
  })
}

const markHelpful = (qid, cb) => {
  const filter = {question_id: qid};
  const update = {helpfulness: + 1};
  Questions.findOneAndUpdate(filter, update).exec(cb);
}

const report = (qid, cb) => {
  const filter = {question_id: qid};
  const update = {reported: true};
  Questions.findOneAndUpdate(filter, update). exec(cb);
}

module.exports.getQuestions = getQuestions;
module.exports.markHelpful = markHelpful;
module.exports.report = report;
module.exports.addQuestion = addQuestion;