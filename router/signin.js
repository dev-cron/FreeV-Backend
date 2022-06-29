const express = require('express');
const router = express.Router();
const {User} = require('../models/models');

router.post('/signin',async (req, res)=>{
    try{
       
        const {email , password} = req.body;
        // console.log(email);
        // console.log(password);
        
        if(!email || !password){
            return res.status(400).json({error:"Enter complete details"});
        }

        const userLogin = await User.findOne({email:email});

        // console.log(userLogin);

        if(userLogin){
            if(password === userLogin.password){
                const token = await userLogin.generateAuthToken();

                // console.log(token);

                res.cookie("jwt",token,{
                    httpOnly:true
                });
            }
            if(password !== userLogin.password){
                return res.status(401).json({error:"Incorrect email or password"});
            }
            else{
                res.json({message:"login successfull"});
            }
        }
    }
    catch(err){
        res.send(err);
    }
})



module.exports = router;