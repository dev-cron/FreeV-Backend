const express = require("express");
const router = express.Router();

router.get("/logout",(req, res) => {
    console.log("log out reached!");
    res.cookie("jwt","loggedOut",{
        httpOnly:true
    });
    res.cookie("isUser","Sign In");
    res.sendStatus(200);
});

module.exports = router;
