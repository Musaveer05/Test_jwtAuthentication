const jwt = require('jsonwebtoken')
const jwt_secret = process.env.SECRETKEY || 'thisismyjwtsecretTokenshouldbestoredinenv'

module.exports = function(req,res,next){

    console.log(req.headers)

    const token = req.headers.token

    console.log('token is ', token)

    if(!token){
        return res.status(401).json({error: 'Please Login'})
    }

    jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        
        req.userId = decoded.userId;
        next(); 
    })

}