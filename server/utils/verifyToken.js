const jwt = require('jsonwebtoken');

function verifyToken (req,res,next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Accès refusé');
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
        next();
    } catch(err) {
        res.status(400).send('Token invalide');
    }
}

module.exports.verifyToken = verifyToken;