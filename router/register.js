const express = require('express');
const router = express.Router();

const User = require('../models/models');

router.post('/register',async (req,res) => {
    console.log(req.body);
    
    const {name , email, password, age} = req.body;

    console.log(name);
    console.log(email);
    console.log(password);
    console.log(age);

    res.send("done");
    // if(!name || !email || !password || !age){
    //     return res.status(422).json({error:"fill all details"});
    // }

    // try{
    //     if( await User.findOne({email:email})){
    //         return res.status(422).json({error:"email already exits"});
    //     }

    //     const user = new User({name, email, password , age});

    //     await user.save();

    //     res.status(201).json({message:"user registerd successfully"});
    // }
    // catch(err){
    //     console.log(err);
    // }
})

router.post('/addvideo',async (req,res)=>{
    const {title,email} = req.body;

    try{
        if(await User.findOne({email:email})){
            // return res.status(422).json({error:"email already exits"});
            User.findOneAndUpdate({email:email},{$push:{
                videos:{
                    title:`${title}`
                }
            }}).exec(); 
            res.status(201).json({message:"video updated"});
        }
    }
    catch(err){
        res.send(err);
    }
})

module.exports = router;