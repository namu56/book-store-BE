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

module.exports = pool;
