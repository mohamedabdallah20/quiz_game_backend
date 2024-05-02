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

ifUserExists = async (req, res) => {
  // Access userId from req.query for GET requests
  const userId = req.query.userId
  if (userId !== 'undefined') {
    try {
      const [result] = await pool.execute(
        'SELECT * FROM Users WHERE user_id = ?',
        [userId]
      )
      if (result.length > 0) {
        res.send({
          success: true,
          message: 'User exists',
          userId: result[0].user_id,
          username: result[0].username,
          max_score: result[0].max_score,
        })
      } else {
        res.send({ success: false, message: 'User does not exist' })
      }
    } catch (error) {
            handleMySQLError(error, res);
        }
    } else {
        // Handle the case where userId is not provided
        res.status(400).send({ success: false, message: 'No userId provided' });
    }
}

module.exports = {
    createUser,
    ifUserExists,
}