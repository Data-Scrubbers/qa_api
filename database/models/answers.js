const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const answersSchema = mongoose.Schema({
    _id: Number,
    question_id: Number,
    body: String,
    date: String,
    answerer_name: String,
    answerer_email: String,
    reported: Boolean,
    helpfulness: Number,
    photos:{
      _id: Number,
      answer_id: Number,
      url: String
    }
}, {
  collection: 'answers'
});
answersSchema.plugin(AutoIncrement, {inc_field: '_id', start_seq: 1048577});
answersSchema.plugin(AutoIncrement, {id: 'photoId_counter', inc_field: 'photos._id', start_seq: 313643});
answersSchema.plugin(AutoIncrement, {id: 'photoAnswerId_counter', inc_field: 'photos.answer_id', start_seq: 1048577});


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


const addAnswer = (qid, query, cb) => {
  Answers.create({
    question_id: qid,
    body: query.body,
    date: Date(),
    answerer_name: query.name,
    answerer_email: query.email,
    reported: false,
    helpfulness: 0,
    photos:{
      url: query.photos
    }
  }, (err) => {
    if (err) {
      cb(err);
    } else {
      cb();
    }
  });

}

module.exports.getAnswers = getAnswers;
module.exports.answersSchema = answersSchema;
module.exports.answersModel = Answers;
module.exports.addAnswer = addAnswer;
module.exports.markHelpful = markHelpful;
module.exports.report = report;