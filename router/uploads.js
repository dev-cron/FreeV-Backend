const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongodb = require('mongodb');
const multer = require('multer');
const VideoData = require('../models/models');
// const User = require('../models/models');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname);
  }
});

let upload = multer({storage:storage});

// router.get('/uploads',(req,res)=>{
//   mongodb.MongoClient.connect(process.env.DB_URL,(error,client)=>{
//     if(error){
//       res.json(error);
//       return;
//     }
//     const db = client.db('videos');
//     const bucket = new mongodb.GridFSBucket(db);
//     const videoUploadStream = bucket.openUploadStream('test');
//     const videoReadStream = fs.createReadStream('testVid.mp4');
//     videoReadStream.pipe(videoUploadStream);
//     res.status(200).send("Done...");
//   });
// });

router.post('/multerCheck',upload.single('image'),async(req,res)=>{
    const {filename, path} = req.file;
    const {title} = req.body;
    console.log(filename);   
    console.log(path);   
    console.log(title);
    
    if (!filename || !path){
        return res.status(422).json({error:"fill all details"});
    }

    try{
        const Video = new VideoData;
        Video.title =  title;
        Video.img.data = fs.readFileSync(path);
        // console.log(Video);
        await Video.save();
        fs.unlink(path,(err)=>{
            if(err){
                console.log(err);
            }
        })
    }
    catch(err){
        console.log(err);
    };
})

module.exports = router;