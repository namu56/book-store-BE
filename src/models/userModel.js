const mariadb = require('../../mariadb');

// class UserModel {
//     constructor(user) {
//         this.email = user.email;
//         this.password = user.password;
//         this.salt = user.salt;
//     }

//     static async createUser(user) {
//         const sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';
//         const values = [user.email, user.password, user.salt];
//         try {
//             const [rows] = await mariadb.query(sql, values);
//             return rows;
//         } catch (err) {
//             console.log(err);
//             throw err;
//         }
//     }

//     static async findByEmail(user) {
//         const sql = `SELECT * FROM users WHERE email = ?`;
//         try {
//             const [rows] = await mariadb.query(sql, [user.email]);
//             console.log(rows);
//             return rows;
//         } catch (err) {
//             console.log(err);
//             throw err;
//         }
//     }
// }

// module.exports = UserModel;
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
