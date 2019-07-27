const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function( req, res, next ){
    //Get token
    const token = req.header('auth-token');

    if(!token){
        return res.status(401).json({
            msg: "No token, access denied"
        })
    }

    //verify token

    try{
        const decoded = await jwt.verify(token,config.get('jwtSecret'));
        req.user = await decoded;
        console.log(req.user);
        
        next();
    }catch(err) {
        console.error(err.message);
        res.status(401).json({
            msg: 'token not valid'
        });
    }
}