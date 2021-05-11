const questions = require('../../database/models/questions');

module.exports = {
  get: (req, res) => {
    questions.getQuestions(req.query, (err, data) => {
      if (err) {
        console.error('this is the error: ', err);
        res.send(err);
      } else {
        res.send({
          product_id: data[0].product_id,
          results: data
        })
      }
    })
  },
  add: (req, res) => {
    const params = [req.query.body, req.query.name, req.query.email, req.query.product_id];
    questions.addQuestion(params, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.status(201).end();
      }
    })
  },
  helpful: (req, res) => {
    questions.markHelpful(req.params.question_id, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.status(204).end();
      }
    })
  },
  report: (req, res) => {
    questions.report(req.params.question_id, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.status(204).end();
      }
    })
  }
}