const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const ensureAuthorization = (req, res) => {
    try {
        let receivedJwt = req.headers['authorization'];
        console.log('receivedJwt: ', receivedJwt);

        if (receivedJwt) {
            let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
            console.log(decodedJwt);
            return decodedJwt;
        } else {
            throw new ReferenceError('jwt must be provided');
        }

        /* 
        유효기간 지났다면, 예외(개발자가 생각하지 못한 에러) 처리
        유효기간 지난 토큰 => res. '로그인(인증) 세션(유지되는 상태)이 만료되었습니다. 다시 로그인해주세요.'
        */
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
        return err;
    }
};

module.exports = { ensureAuthorization };
