const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { getAllQuestionsRandomly } = require('./src/controllers/questionController');
const { createUser, ifUserExists } = require('./src/controllers/userController');
const { submitAnswers } = require('./src/controllers/answerController');

app.use(cors());
app.use(express.json());

        // Endpoints 
// Questions
app.get('/api/v1/questions', getAllQuestionsRandomly)

// Users
app.post('/api/v1/users', createUser)
app.get('/api/v1/userExists', ifUserExists)

// Answers
app.post('/api/v1/answers', submitAnswers)

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
})

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
