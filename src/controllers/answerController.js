const pool = require('../db/database');
const { handleMySQLError } = require("../utils/mysqlErrorHandling");

async function submitAnswers(req, res) {
    const {userId, answers} = req.body;
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
        const values = answers.map(answer => 
            `SELECT ${connection.escape(user_id)}, ${connection.escape(Number(answer.question_id))}, ${connection.escape(answer.choice_id)}, ${connection.escape(nextAttemptNumber)}`
        ).join(' UNION ALL ');
        
        const insertQuery = `
            INSERT INTO Answers (user_id, question_id, choice_id, is_correct, attempt_number)
            SELECT tmp.user_id, tmp.question_id, tmp.choice_id, Choices.is_correct, tmp.attempt_number
            FROM (${values}) AS tmp (user_id, question_id, choice_id, attempt_number)
            JOIN Choices ON Choices.choice_id = tmp.choice_id;
        `;

        // Execute the bulk insert
        // console.log(insertQuery)

        await connection.query(insertQuery);

        // Commit the transaction
        await connection.commit();

        res.send({ success: true, message: 'Answers submitted successfully' });
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