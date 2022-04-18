const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  nsfw:{
    type:String,
    required:true,
  },
  img:{ 
    data: Buffer,
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age:{
    type:Number,
    required: true,
  },
  videos:[videoSchema]
})


const VideoData = mongoose.model('VideoData',videoSchema);
const User = mongoose.model('USER',userSchema);

module.exports = User;
module.exports = VideoData;