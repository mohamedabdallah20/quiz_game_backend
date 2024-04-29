const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { getAllQuestionsRandomly } = require('./src/controllers/questionController');
const { createUser } = require('./src/controllers/userController');

app.use(cors());
app.use(express.json());

        // Endpoints 
// Questions
app.get('/api/v1/questions', getAllQuestionsRandomly)

// Users
app.post('/api/v1/users', createUser)

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
