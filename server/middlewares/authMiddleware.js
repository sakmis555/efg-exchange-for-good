const jwt = require("jsonwebtoken");
// sm next method means : the logic inside the try{} block of end points
module.exports = (req, res, next) => {
    try {
        // sm get the token from header (axiosInstance)
        // sm axios authorization is spilleted into array by using split() function and accessed using arrays one index.

        const token = req.header("authorization").split(" ")[1];
        const secret_key = process.env.jwt_secret;
        const decryptedToken = jwt.verify(token, secret_key);

        // sm inside decryptedToken, there is an object with userId. 
        // sm Now, attach the userId to req.body
        req.body.userId = decryptedToken._userId;
        
        // sm call the next() method to executed the try{} block bode inside the endpoint.
        next();

    } catch (error) {
        // console.log("executing");
        res.send({
            success: false,
            message: error.message,
        })
    }
}