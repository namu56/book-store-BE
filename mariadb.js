const dotenv = require('dotenv').config();

// mysql 모듈 소환
const mariadb = require('mysql2/promise');

// DB와 연결 통로 생성
const pool = mariadb.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'Bookstore',
    dateStrings: true,
    connectionLimit: 30,
});

pool.getConnection()
    .then((conn) => {
        console.log('성공적으로 데이터베이스 연결');
        conn.release();
    })
    .catch((err) => {
        console.error('데이터베이스 연결 실패:', err);
    });

module.exports = pool;
