const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

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
    type:String,
    required:true,
  },
  uuid:{
    type:String,
    required:true
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
  videos:[videoSchema],
  token:{
    type:String,
  }
})

userSchema.methods.generateAuthToken = async function(){
  try{
    let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
    this.token = token;
    await this.save();
    return token;
  }
  catch(err){
    console.log(err);
  }
}


const VideoData = mongoose.model('VideoData',videoSchema);
const User = mongoose.model('USER',userSchema);

module.exports = { User , VideoData};