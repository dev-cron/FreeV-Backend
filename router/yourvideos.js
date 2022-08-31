const express = require("express");
const { userSpecific } = require("../models/models");
const auth = require('../middleware/authentication');
const router = express.Router();

router.get("/videos",auth,async (req, res) => {
    
    console.log('videos executed!');

    if(req.auth === "true"){
        const user = req.rootUser.email;
        if(await userSpecific.findOne({email:user})){
        const data = await userSpecific.findOne({email:user});
        // console.log(data);
        res.status(200).send(data.videos);
        }
    }
    else{
        res.sendStatus(400);
    }
//   console.log(data);
//   res.send(data);
});

module.exports = router;
