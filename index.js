const express = require('express');
const pool = require('./database'); // Import your database configuration
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to get questions
app.get('/questions', async (req, res) => {
    const limit =  100;
  try {
    const [questions] =  await pool.query('SELECT * FROM Questions ORDER BY RAND() LIMIT ?',[limit]);
    
    let questionArray = [];

    for(const question of questions) {
      const [choices] =  await pool.execute('SELECT choice_id, choice_text FROM Choices WHERE question_id = ? LIMIT 3' , [question.question_id]);
      questionArray.push({question: {id:question.question_id,text:question.question_text,choices: choices}});
    }
    res.send(questionArray);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' })
  }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
