const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("index")
})

router.get("/contact", (req, res)=>{
    res.render("contact")
})

router.get("/gallery", (req, res)=>{
    res.render("gallery")
})

module.exports = router;