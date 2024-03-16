const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const ensureAuthorization = (strictMode) => {
    return (req, res, next) => {
        try {
            let receivedJwt = req.headers['authorization'];

            if (receivedJwt) {
                let decodedJwt = jwt.verify(
                    receivedJwt,
                    process.env.PRIVATE_KEY
                );

                req.decodedJwt = decodedJwt;
            } else {
                req.decodedJwt = null;
                if (strictMode) throw new ReferenceError();
            }
            next();
        } catch (err) {
            console.log(err);
            next(err);
        }
    };
};

const strictEnsureAuthorization = ensureAuthorization(true);
const looseEnsureAuthorization = ensureAuthorization(false);

module.exports = { strictEnsureAuthorization, looseEnsureAuthorization };
