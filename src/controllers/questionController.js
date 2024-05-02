const pool = require('../db/database'); // Import your database configuration
const { handleMySQLError } = require('../utils/mysqlErrorHandling');

getAllQuestionsRandomly = async (req, res) => {
    const limit =  100;
  try {
    const [questions] =  await pool.query('SELECT * FROM Questions ORDER BY RAND() LIMIT ?',[limit]);
    
    let questionArray = [];

    for(const question of questions) {
      const [choices] =  await pool.execute('SELECT choice_id, choice_text FROM Choices WHERE question_id = ? LIMIT 3' , [question.question_id]);
      questionArray.push( {id:question.question_id,text:question.question_text,choices: choices});
    }
    res.send({ success: true, message: 'Questions is ready', questions:questionArray });
  } catch (error) {
    handleMySQLError(error, res);
    res.status(500).json({ error: 'Failed to fetch questions' })
  }
}

module.exports = {
    getAllQuestionsRandomly,
}