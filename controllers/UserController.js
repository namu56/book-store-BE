const conn = require('../mariadb'); // db 모듈
const { StatusCodes } = require('http-status-codes');
const { QueryErrorHandler } = require('../middlewares/errorHandler');
const jwt = require('jsonwebtoken'); // jwt 모듈
const crypto = require('crypto'); // crypto 모듈 : 암호화
const dotenv = require('dotenv'); // dotenv 모듈
dotenv.config();

const join = (req, res) => {
    const { email, password } = req.body;

    // 암호화된 비밀번호와 salt 값을 같이 DB에 저장
    const salt = crypto.randomBytes(10).toString('base64');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';
    let values = [email, hashedPassword, salt];

    conn.query(sql, values, (err, results) => {
        if (err) throw new QueryErrorHandler('쿼리 에러 발생');

        if (results.affectedRows) {
            return res.status(StatusCodes.CREATED).json(results);
        } else {
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    let sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql, email, (err, results) => {
        if (err) throw new QueryErrorHandler('쿼리 에러 발생');

        const loginUser = results[0];

        // salt값 꺼내서 날 것으로 들어온 비밀번호를 암호화 해보고
        const hashedPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');

        // 디비 비밀번호랑 비교
        if (loginUser && loginUser.password === hashedPassword) {
            // 토큰 발행
            const token = jwt.sign(
                {
                    userId: loginUser.id,
                    email: loginUser.email,
                },
                process.env.PRIVATE_KEY,
                {
                    expiresIn: '5h',
                    issuer: 'oneik',
                }
            );

            // 토큰 쿠키에 담기
            res.cookie('token', token, {
                httpOnly: true,
            });

            console.log(token);

            return res.status(StatusCodes.OK).json(results);
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).end(); // 401 : Unauthorized(미인증 상태)
        }
    });
};

const passwordResetRequest = (req, res) => {
    const { email } = req.body;

    let sql = 'SELECT * FROM users WHERE email = ?';
    conn.query(sql, email, (err, results) => {
        if (err) throw new QueryErrorHandler('쿼리 에러 발생');

        // 이메일로 유저가 있는지 찾아본다
        const user = results[0];
        if (user) {
            return res.status(StatusCodes.OK).json({
                email: email,
            });
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).end();
        }
    });
};

const passwordReset = (req, res) => {
    const { email, password } = req.body;

    const salt = crypto.randomBytes(10).toString('base64');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    let sql = 'UPDATE users SET password = ?, salt = ? WHERE email = ?';
    let values = [hashedPassword, salt, email];
    conn.query(sql, values, (err, results) => {
        if (err) throw new QueryErrorHandler('쿼리 에러 발생');

        if (results.affectiedRows == 0) {
            return res.status(StatusCodes.BAD_REQUEST).end();
        } else {
            return res.status(StatusCodes.OK).json(results);
        }
    });
};

module.exports = { join, login, passwordResetRequest, passwordReset };
