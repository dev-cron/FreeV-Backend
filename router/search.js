const express = require("express");
const { VideoData } = require("../models/models");
const router = express.Router();

router.get("/search/:query",async (req, res) => {

  console.log("search executed!");

  const obj = req.params;
  const search = obj.query;

  const data = await VideoData.find({title:{$regex:search,$options:'i'}});
  res.status(200).send(data);
});

module.exports = router;
