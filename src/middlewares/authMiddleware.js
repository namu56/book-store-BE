const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const ensureAuthorization = (strictMode) => {
    return (req, res, next) => {
        try {
            let receivedJwt = req.headers['authorization'];
            console.log('receivedJwt: ', receivedJwt);

            if (receivedJwt) {
                let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);

                req.decodedJwt = decodedJwt;
                console.log(req.decodedJwt);
            } else {
                req.decodedJwt = null;

                if (strictMode) throw new ReferenceError();
            }
            next();
        } catch (err) {
            console.log(err.name);
            console.log(err.message);
            next(err);
        }
    };
};

const strictEnsureAuthorization = ensureAuthorization(true);
const looseEnsureAuthorization = ensureAuthorization(false);

module.exports = { strictEnsureAuthorization, looseEnsureAuthorization };
