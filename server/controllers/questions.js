const db = require('../../database/index.js');

module.exports = {
  get: (req, res) => {
    db.getQuestions(req.query, (err, data) => {
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
  }

}