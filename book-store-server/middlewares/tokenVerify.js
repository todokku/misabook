const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('token');
    if (!token)
        return res.send({ message: 'Access denied' });
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch(error) {
        res.send({ message: 'Invalid password' });
    }
}

module.exports = auth;