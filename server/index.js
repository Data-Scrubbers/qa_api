const express = require('express');
let app = express();
const db = require('../database/index')
const questions = require('./controllers/questions')
const answers = require('./controllers/answers')

app.get('/qa/questions', questions.get);
app.get('/qa/questions/:question_id/answers', answers.get);
app.post('/qa/questions/', questions.add);
app.post('/qa/questions/:question_id/answers', answers.add);
app.put('/qa/questions/:question_id/helpful', questions.helpful);
app.put('/qa/questions/:question_id/report', questions.report);
app.put('/qa/answers/:answer_id/helpful', answers.helpful);
app.put('/qa/answers/:answer_id/report', answers.report);


let port = 3000;

app.listen(port, function() {
  console.log(`Jared is listening on port ${port}`);
});