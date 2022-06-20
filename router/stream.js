const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongodb = require('mongodb');

router.get("/mongo-video/:param", function (req, res) {
    const obj = req.params;
    console.log(obj);

    mongodb.MongoClient.connect(process.env.DB_URL, function (error, client) {
      if (error) {
        res.status(500).json(error);
        return;
      }
  
      const range = req.headers.range;
      if (!range) {
        res.status(400).send("Requires Range header");
      }
  
      const db = client.db('videos');
      // GridFS Collection
      db.collection('fs.files').findOne({filename:obj.param}, (err, video) => {
        if (!video) {
          res.status(404).send("No video uploaded!");
          return;
        }
  
        // Create response headers
        console.log(video);
        const videoSize = video.length;
        const start = Number(range.replace(/\D/g, ""));
        const end = videoSize - 1;
  
        const contentLength = end - start + 1;
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
        };
  
        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);
  
        const bucket = new mongodb.GridFSBucket(db);
        const downloadStream = bucket.openDownloadStreamByName(`${obj.param}`, {
          start
        });
  
        // Finally pipe video to response
        downloadStream.pipe(res);
      });
    });
  });

  module.exports = router;