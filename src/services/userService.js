const userModel = require('../models/userModel');
const pool = require('../../mariadb');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { emit } = require('process');
const dotenv = require('dotenv').config();

const join = async (email, hashedPassword, salt) => {
    const connection = await pool.getConnection();

    try {
        const userData = await userModel.userData(connection, email);

        if (!userData) {
            return userModel.join(connection, email, hashedPassword, salt);
        } else {
            throw new Error(StatusCodes.CONFLICT, '이미 가입된 계정입니다.');
        }
    } catch (err) {
        throw err;
    } finally {
        connection.release();
    }
};

const login = async (email, password) => {
    const connection = await pool.getConnection();

    try {
        const loginUser = await userModel.userData(connection, email);
        const hashedPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');

        if (loginUser && loginUser.password === hashedPassword) {
            const token = jwt.sign(
                {
                    userId: loginUser.id,
                    email: loginUser.email,
                },
                process.env.PRIVATE_KEY,
                {
                    expiresIn: '1h',
                    issuer: 'oneik',
                }
            );
            // 토큰 쿠키에 담기
            console.log(token);
            return token;
        } else {
            throw new Error(StatusCodes.UNAUTHORIZED);
        }
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        connection.release();
    }
};

const findUser = async (email) => {
    const connection = await pool.getConnection();
    try {
        const userData = await userModel.userData(connection, email);
        if (userData) {
            return;
        } else {
            throw new Error(StatusCodes.BAD_REQUEST);
        }
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        connection.release();
    }
};

const passwordReset = async (email, password) => {
    const connection = await pool.getConnection();

    try {
        console.log(email, password);
        const salt = crypto.randomBytes(10).toString('base64');
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
        console.log(salt, hashedPassword);
        return await userModel.updateUserData(connection, hashedPassword, salt, email);
    } catch (err) {
        throw err;
    } finally {
        connection.release();
    }
};

module.exports = { join, login, findUser, passwordReset };
