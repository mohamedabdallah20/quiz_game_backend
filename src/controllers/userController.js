const pool = require('../db/database'); // Import your database configuration
const { handleMySQLError } = require('../utils/mysqlErrorHandling');

createUser = async (req, res) => {
    try {
        const [result] = await pool.execute(
            'INSERT INTO Users (username, email,mobile,city) VALUES (?, ?, ?, ?)',
            [req.body.name, req.body.email,req.body.mobile,req.body.city]
        );
        res.send({ success: true, message: 'User created successfully', userId: result.insertId });
    } catch (error) {
        handleMySQLError(error, res);
    }
}

fetchUserByEmail = async (req, res) => {
    const email = req.params.email
    try {
        const [result] = await pool.execute(
            'SELECT user_id FROM Users WHERE email = ?',
            [email]
        )
        if (result.length > 0) {
          // console.log(result);
            res.send({
                success: true,
                message: 'User exists',
                userId: result[0].user_id,
            })
        } else {
            res.send({ success: false, message: 'User does not exist' })
        }
        } 
        catch (error) {
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

fetchUsersHighScore = async ()=>{
  try {
    const [users] =  await pool.execute('SELECT user_id,username, max_score FROM `Users` WHERE max_score >0 ORDER BY max_score DESC;')
    return {
      success: true,
      message: 'DashBoard is ready',
      users
    }
  } catch (error) {
    return {
      success: false,
      message: 'There is a problem to process your request',
      details: error
    };
  }  
}
const dashBoard = (socket,io)=>{
  console.log("a User connected");

  const sendScoreUpdates = async () => {
      const scores = await fetchUsersHighScore();
      if(scores.success){
          io.emit('score update', scores.users);
          // console.log("score update sent");
      }
  };
  socket.on('score request', sendScoreUpdates);
  // const intervalId = setInterval(sendScoreUpdates, 5000);

  socket.on('disconnect', () => {
      console.log('user disconnected');
      // clearInterval(intervalId);
  });
}

module.exports = {
    createUser,
    ifUserExists,
    dashBoard,
    fetchUserByEmail
}