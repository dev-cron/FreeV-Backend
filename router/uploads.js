const express = require("express");
const router = express.Router();
const fs = require("fs");
const mongodb = require("mongodb");
const multer = require("multer");
const authentication = require("../middleware/authentication");
const { VideoData, User, userSpecific } = require("../models/models");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


let upload = multer({ storage: storage });

router.post("/upload-video",authentication, upload.single("video"), (req, res) => {
  if(req.auth === "true"){
  const { title } = req.body;
  console.log(req.file);
  mongodb.MongoClient.connect(process.env.DB_URL, (error, client) => {
    if (error) {
      res.json(error);
      return;
    }
    const db = client.db("videos");
    const bucket = new mongodb.GridFSBucket(db);
    const videoUploadStream = bucket.openUploadStream(`${title}`);
    const videoReadStream = fs.createReadStream(
      `./uploads/${req.file.filename}`
    );
    videoReadStream.pipe(videoUploadStream);
    res.status(200).send("Done...");
    fs.unlink(`./uploads/${req.file.filename}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
  }
  else{
    res.sendStatus(400);
  }
});

router.post("/upload-data", authentication, async (req, res) => {
  
  const { title, nsfw, image, uuid } = req.body;

  if (!image || !nsfw || !title) {
    return res.status(422).json({ error: "fill all details" });
  }

  if (req.auth === "true") {
    try {
      const Video = new VideoData();
      
      Video.title = title;
      Video.img = image;
      Video.nsfw = nsfw;
      Video.uuid = uuid;

      if(await userSpecific.findOne({email:req.rootUser.email})){
        await userSpecific.findOneAndUpdate({email:req.rootUser.email},
        {
          $push: {
            videos:{
              "title": title,
              "img":image,
              "uuid":uuid
            }
          }
        }).exec()
      }
      else{
        const uservideo = new userSpecific();
        uservideo.email = req.rootUser.email;
        uservideo.videos = [{"title": title,"img":image,"uuid":uuid}];
        await uservideo.save();
      } 

      await Video.save();
      res.sendStatus(200);
    } 
    catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
