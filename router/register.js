const express = require('express');
const router = express.Router();

const {User}  = require('../models/models');

router.post('/register',async (req,res) => {
    console.log(req.body);
    
    const {name , email, password, age} = req.body;

    if(!name || !email || !password || !age){
        return res.status(422).json({error:"fill all details"});
    }

    try{
        if( await User.findOne({email:email})){
            return res.status(409).json({error:"email already exits"});
        }

        const user = new User({name, email, password , age});

        await user.save();

        res.status(201).json({message:"user registerd successfully"});
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;