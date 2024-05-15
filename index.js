const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const cors = require('cors');
const { getAllQuestionsRandomly } = require('./src/controllers/questionController');
const { createUser, ifUserExists, dashBoard } = require('./src/controllers/userController');
const { submitAnswers } = require('./src/controllers/answerController');

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
const server = http.createServer(app);
const io = new Server(server,{cors:corsOptions});
const port = 3000;

app.use(cors());
app.use(express.json());

        // Endpoints 

// Questions
app.get('/api/v1/questions', getAllQuestionsRandomly)

// Users
app.post('/api/v1/users', createUser)
app.get('/api/v1/userExists', ifUserExists)
// Socket DASHBOARD
io.on('connection', (socket) => {
    dashBoard(socket, io); // Pass the `io` instance here
});
// Answers
app.post('/api/v1/answers', submitAnswers)

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
})

// Start server
server.listen(port, () => {
    console.log(`Server running at Port: ${port}`);
});
