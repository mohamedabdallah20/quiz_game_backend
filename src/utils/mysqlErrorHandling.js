function handleMySQLError(error, res) {
    switch (error.code) {
        case 'ER_DUP_ENTRY':
            res.status(409).json({ success: false, message: 'Entry already exists', details: error.sqlMessage });
            break;
        case 'ER_BAD_TABLE_ERROR':
        case 'ER_NO_SUCH_TABLE':
            res.status(404).json({ success: false, message: 'Resource not found', details: error.sqlMessage });
            break;
        case 'ER_DATA_TOO_LONG':
            res.status(413).json({ success: false, message: 'Data too long for column', details: error.sqlMessage });
            break;
        default:
            // console.error('Database error:', error);
            res.status(500).json({ success: false, message: 'There is a problem to process your request', details: error.sqlMessage });
    }
}

module.exports = {handleMySQLError}