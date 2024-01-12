const jwt = require('jsonwebtoken');

function ensureAuthorization(req) {
    let receivedJwt = req.headers['authorization'];
    console.log('receivedJwt: ', receivedJwt);

    let decodedJwt = jwt.verify(receivedJwt, process.env.PRIVATE_KEY);
    console.log(decodedJwt);

    return decodedJwt;
}

module.exports = { ensureAuthorization };
