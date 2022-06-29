const express = require("express");
const router = express.Router();
const { VideoData } = require("../models/models");
const Authenticate = require("../middleware/authentication");

router.get("/home", Authenticate, async (req, res) => {
  if (req.auth == "true") {
    let data;
    if (req.rootUser.age >= 18) {
      data = await VideoData.find({});
    } else {
      data = await VideoData.find({ nsfw: "false" });
    }
    res.cookie("isUser", req.name);
    res.send(data);
  } else {
    let data = await VideoData.find({ nsfw: "false" });
    res.cookie('isUser','Sign In');
    res.send(data);
  }
});

module.exports = router;
