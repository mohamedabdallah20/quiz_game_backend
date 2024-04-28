const express = require('express');
const pool = require('./database'); // Import your database configuration
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to get questions
app.get('/questions', (req, res) => {
    pool.query('SELECT * FROM Questions', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve questions' });
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
