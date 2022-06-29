const express = require("express");
const { VideoData } = require("../models/models");
const router = express.Router();

router.get("/search",async (req, res) => {
  const {query} = req.body;
  console.log(query);

//   const data = await VideoData.find({title:{$regex:query,$options:'i'}});
//   console.log(data);
//   res.send(data);
});

module.exports = router;
