//middleware is just a function that has access to the req and res cycle and req and res object.
//so every time we hit a end point we can fire off this middleware and check if there's a token in the header

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    //get token from header
    const token = req.header('x-auth-token');

    //check if not token
    if (!token){
        return res.status(401).json({msg:"No Token, authorization denied"});
    }

    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg:"Token not valid"});
    }
}