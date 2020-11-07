const jwt = require('jsonwebtoken')

module.exports= (res, req, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET_KEY');
        const userId = decodeToken.userId;

        if( req.body.userId && req.body.userId != userId){
            throw 'Invalid userId'
        } else{
            next();
        }
    }
    catch{
        res.status(401).json({
            error: new Error('Invalid request!')
        })
    }
}