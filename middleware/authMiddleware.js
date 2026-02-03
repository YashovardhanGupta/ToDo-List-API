const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //? 1. Get token from headers
    //? It is sent like "Authentication: Bearer <token>"
    const token = req.header('Authorization');

    //? 2. Check if token exists
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        //? 3. Verify token
        //? We remove the bearer part just to get the code
        const tokenString = token.replace('Bearer ', '');

        //? This decodes the token using my SECRET key
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);

        //? 4. Add the user info
        //? Now every route after this knows exactly who the user logged in is
        req.user = decoded;

        //? Allow them to pass
        next();
    } catch (error) {
        return res.status(400).json({ message: "Token is not valid" });
    }
}