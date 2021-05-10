const express = require('express');
let app = express();
const db = require('../database/index.js')



app.get('/qa/questions/:question_id/answers', function (req, res) {
  db.getAnswers(req.param.question_id, req.query, (err, data) => {
    if (err) {
      console.error('this is the error: ', err);
      res.send(err);
    } else {
      res.send({

        data});
    }
  })
});



let port = 3000;

app.listen(port, function() {
  console.log(`Jared is listening on port ${port}`);
});