import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {   //"next" allows the function to continue
    try {
        let token = req.header("Authorization"); //to grab from the frontend

        if (!token) return res.status(403).send("Access Denied");

        if (token.startsWith("Bearer ")) {  //the token will be placed after Bearer so we take all of it
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (err) {
        res.status(500).json({error: err.message})
    }
}