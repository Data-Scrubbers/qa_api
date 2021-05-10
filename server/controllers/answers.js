const db = require('../../database/index.js');

module.exports = {
  get: (req, res) => {
    db.getAnswers(req.param.question_id, req.query, (err, data) => {
      if (err) {
        console.error('this is the error: ', err);
        res.send(err);
      } else {
        res.send({

          data});
      }
    })
  }

}