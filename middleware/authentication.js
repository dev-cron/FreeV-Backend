const jwt = require('jsonwebtoken');
const {User} = require('../models/models');

module.exports = async (req,res,next) => {
    try{
        if(req.cookies.jwt!== undefined){
        
        const token = req.cookies.jwt;
        
        const verify = jwt.verify(token,process.env.SECRET_KEY);
        
        const rootUser = await User.findOne({_id:verify._id});
        
        if(!rootUser){
            throw new Error('User not found');
        }
        
        req.auth = "true";
        
        req.token = token;
        
        req.rootUser = rootUser;
        
        next();
        
    }
       
    else
    {
            req.auth = "false";
            next();
    }
    
}
    catch(err){
        res.status(404).send("error occured");
        console.log(err);
    }
}

