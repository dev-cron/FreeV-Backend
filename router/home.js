const express = require('express');
const router = express.Router();
const {VideoData} = require('../models/models');
const Authenticate = require('../middleware/authentication');

router.get('/',Authenticate,async(req,res)=>{
  if(req.auth=="true"){
    let data;
    console.log("in auth true");
    console.log(req.rootUser.age);
    if(req.rootUser.age>=18){
      data = await VideoData.find({});
    }
    else{
      data = await VideoData.find({nsfw:"false"});
    }
    res.cookie('isUser','1');
    res.send(data);
  }
  else{
    console.log("in auth fasle");
  let data = await VideoData.find({nsfw:"false"});
  res.send(data);
  }
})
 
module.exports = router;