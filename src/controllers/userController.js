const pool = require('../db/database'); // Import your database configuration
const { handleMySQLError } = require('../utils/mysqlErrorHandling');

createUser = async (req, res) => {
    try {
        const [result] = await pool.execute(
            'INSERT INTO Users (username, email) VALUES (?, ?)',
            [req.body.name, req.body.email]
        );
        res.send({ success: true, message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        handleMySQLError(error, res);
    }
}

module.exports = {
    createUser,
}