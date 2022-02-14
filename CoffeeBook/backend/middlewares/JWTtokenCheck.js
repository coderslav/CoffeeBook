const jwt = require('jsonwebtoken');

function JWTtokenCheck(req, res, next) {
    req.session = {};
    if (!req.cookies.access_token) {
        req.session.user = false;
        next();
    } else {
        jwt.verify(req.cookies.access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                req.session.user = false;
                next();
            } else {
                req.session.user = user;
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
//         req.session.user = user;
//         next();
//     });
// }

module.exports = JWTtokenCheck;
