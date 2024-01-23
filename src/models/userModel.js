const join = async (connection, email, hashedPassword, salt) => {
    let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';
    let values = [email, hashedPassword, salt];

    return await connection.query(sql, values);
};

const userData = async (connection, email) => {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const [userData] = await connection.query(sql, email);

    return userData[0];
};

const updateUserData = async (connection, hashedPassword, salt, email) => {
    let sql = 'UPDATE users SET password = ?, salt = ? WHERE email = ?';
    let values = [hashedPassword, salt, email];

    const [result] = await connection.query(sql, values);

    return result;
};

module.exports = { join, userData, updateUserData };
