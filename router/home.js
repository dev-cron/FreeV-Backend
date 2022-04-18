const express = require('express');
const router = express.Router();
const VideoData = require('../models/models');

router.get('/',async(req,res)=>{
  let data = await VideoData.find();
  res.send([data]); 
})
 
module.exports = router;