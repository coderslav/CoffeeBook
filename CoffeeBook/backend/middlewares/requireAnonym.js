const { User } = require('../models');

async function requireAnon(req, res, next) {
    if (!req.session.user) {
        next();
    } else {
        console.log('Nice! We are here!');
        //If user logged and access_token is valid, we will return useData object to Frontend
        const { id, firstName, lastName, isAdmin, profilePicturePath } = await User.findOne({ where: { id: req.session.user.id }, raw: true });
        res.status(200).send({ user: { id, isAdmin, firstName, lastName, profilePicturePath } });
    }
}

module.exports = requireAnon;
