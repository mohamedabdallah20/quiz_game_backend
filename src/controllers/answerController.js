const pool = require('../db/database');
const { handleMySQLError } = require("../utils/mysqlErrorHandling");

async function submitAnswers(req, res) {
    const {userId, answers} = req.body;
    if(!userId || !answers) {
        return res.status(400).json({success: false, message: 'userId and answers are required'});
    }
    if(!Array.isArray(answers)) {
        return res.status(400).json({success: false, message: 'answers must be an array'});
    }
    if(answers.length === 0) {
        return res.send({ success: true, message: 'Answers submitted successfully',score: 0});
    }
    // console.log(userId.userId);
    const user_id = Number(userId.userId);

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        // Calculate the next attempt number
        const [attempts] = await connection.execute(
            'SELECT MAX(attempt_number) AS max_attempt FROM Answers WHERE user_id = ?',
            [user_id]
        );
        const nextAttemptNumber = attempts[0].max_attempt + 1 || 1;

        // Prepare the bulk insert query
        const values = answers.map(answer => {
            const question_id = connection.escape(Number(answer.question_id));
            const choice_id = connection.escape(answer.choice_id);
            const user_id_esc = connection.escape(user_id);
            const nextAttemptNumber_esc = connection.escape(nextAttemptNumber);
            return `(${user_id_esc}, ${question_id}, ${choice_id}, (SELECT is_correct FROM Choices WHERE choice_id = ${choice_id}), ${nextAttemptNumber_esc})`;
        });
        
        const insertQuery = `
            INSERT INTO Answers (user_id, question_id, choice_id, is_correct, attempt_number)
            VALUES ${values.join(', ')}
        `;

        // Execute the bulk insert
        // console.log(insertQuery)

        await connection.execute(insertQuery);

        const [scoreResult] = await connection.execute(
            'SELECT COUNT(*) AS correct_answers FROM Answers WHERE user_id = ? AND attempt_number = ? AND is_correct = 1',
            [user_id, nextAttemptNumber]
        );
        const correctAnswers = scoreResult[0].correct_answers;
        
        await connection.execute(
            'UPDATE Users SET max_score = GREATEST(max_score, ?) WHERE user_id = ?',
            [correctAnswers, user_id]
        );
        
        // Commit the transaction
        await connection.commit();

        res.send({ success: true, message: 'Answers submitted successfully',score: correctAnswers});
    } catch (error) {
        if (connection) await connection.rollback();
        handleMySQLError(error,res);
        // console.error("Failed to submit answers:", error);
        // throw error;
    } finally {
        if (connection) await connection.release();
        // console.log("Connection released");
    }
}

module.exports = {
    submitAnswers,
}