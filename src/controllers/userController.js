const pool = require('../../mariadb'); // db 모듈s
const userService = require('../services/userService');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken'); // jwt 모듈
const crypto = require('crypto'); // crypto 모듈 : 암호화
const dotenv = require('dotenv').config(); // dotenv 모듈

const join = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 암호화된 비밀번호와 salt 값을 같이 DB에 저장
        const salt = crypto.randomBytes(10).toString('base64');
        const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

        const result = await userService.join(email, hashedPassword, salt);

        return res.status(StatusCodes.CREATED).json(result);
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await userService.login(email, password);

        res.cookie('token', token, {
            httpOnly: true,
        });
        return res.status(StatusCodes.OK).json({ message: '로그인 성공' });
    } catch (err) {
        next(err);
    }
};

const passwordResetRequest = async (req, res, next) => {
    try {
        const { email } = req.body;
        await userService.findUser(email);
        return res.status(StatusCodes.OK).json({ message: '초기화 요청 성공' });
    } catch (err) {
        next(err);
    }
};

const passwordReset = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const result = await userService.passwordReset(email, password);
        return res.status(StatusCodes.OK).json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = { join, login, passwordResetRequest, passwordReset };
