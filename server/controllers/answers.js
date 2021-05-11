const Answers = require('../../database/models/answers');

module.exports = {
  get: (req, res) => {
    Answers.getAnswers(req.params.question_id, req.query, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send({
          question_id: req.params.question_id,
          page: req.query.page,
          count: data.length,
          results: data
        })
      }
    })
  },

  add: (req, res) => {
    const params = [req.query.body, req.query.name, req.query.email, req.query.photos];
    Answers.addAnswer(req.params.question_id, params, (err, data) => {
      console.log('this is server params: ', params);
      if (err) {
        res.send(err);
      } else {
        res.status(201).end();
      }
    })
  },

  helpful: (req, res) => {
    Answers.markHelpful(req.params.answer_id, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.status(204).end();
      }
    })
  },

  report: (req, res) => {
    Answers.report(req.params.answer_id, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.status(204).end();
      }
    })
  }
}