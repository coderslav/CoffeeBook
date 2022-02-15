async function requireAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send('Please login first');
    }
}

module.exports = requireAuth;
