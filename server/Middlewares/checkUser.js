import jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';
dotenv.config();

const fetchUser = (req, res, next) => {
    // Fetches JWT send in "authtoken" header and store it into "token" variable
    const token = req.header('authToken');
    
    // Checks token exists or not
    if (!token) {
        res.status(401).send({ error: "Authentication did not happen" });
    } else {
   
        try {
            
            // Verifying and Getting the object that contains id of user from the token
            const data = jwt.verify(token, process.env.SECRET_KEY || 'you_should_use_your_own_secret_key');
            
            // Stores "id" of user into req.user object
            req.user = data;
            
            // Calling next function
            next();
            
        } catch (error) {
            res.status(401).send({ error: "Authentication did not happen" })
        }
    }
}

export default fetchUser;