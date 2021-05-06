const express = require('express');
let app = express();
const db = require('../database/index.js')

app.get(`qa/questions?product_id=productId&count=100`, function (req, res) {
  // TODO - your code here!
  db.getQuestions(req.params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

let port = 3000;

app.listen(port, function() {
  console.log(`Jared is listening on port ${port}`);
});