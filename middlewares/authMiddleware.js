const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const ensureAuthorization = (req, res, next) => {
    try {
        let receivedJwt = req.headers['authorization'];
        console.log('receivedJwt: ', receivedJwt);

        if (receivedJwt) {
            let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
            console.log(decodedJwt);
            req.decodedJwt = decodedJwt;
        } else {
            throw new ReferenceError();
        }
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
        next(err);
    }
};

module.exports = { ensureAuthorization };
