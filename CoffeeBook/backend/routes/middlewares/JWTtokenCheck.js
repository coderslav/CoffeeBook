const jwt = require('jsonwebtoken');

function JWTtokenCheck(req, res, next) {
    let token;
    const authHeader = req.headers['authorization'];
    authHeader ? (token = authHeader.split(' ')[1]) : false;
    if (!token) {
        req.user = false;
        next();
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                req.user = false;
                next();
            } else {
                req.user = user;
                next();
            }
        });
    }
}

// Second variant with HTTP Errors

// function JWTtokenCheck(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     console.log(token);
//     if (!token) return res.sendStatus(401);
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// }

module.exports = JWTtokenCheck;
