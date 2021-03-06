const questions = require('../../database/models/questions');

module.exports = {
  get: (req, res) => {
    questions.getQuestions(req.query.product_id, req.query.page, req.query.count, (err, data) => {
      if (err) {
        console.error('this is the error: ', err);
        res.send(err);
      } else {
        console.log(data);
        res.send({
          // product_id: data[0].product_id,
          results: data
        })
      }
    })
  },
  add: (req, res) => {
    questions.addQuestion(req.query, (err, data) => {
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