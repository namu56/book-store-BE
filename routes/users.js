const express = require('express'); // express 모듈
const router = express.Router();
const conn = require('../mariadb'); // db 모듈

const { join, login, passwordResetRequest, passwordReset } = require('../controllers/UserController');
const {
    validateJoin,
    validateLogin,
    validatePasswordResetRequest,
    validatepasswordReset,
} = require('../middlewares/validationMiddleware');

router.post('/join', validateJoin, join); // 회원 가입
router.post('/login', validateLogin, login); // 로그인
router.post('/reset', validatePasswordResetRequest, passwordResetRequest); // 비밀번호 초기화 요청
router.put('/reset', validatepasswordReset, passwordReset); // 비밀번호 초기화

module.exports = router;
