const express = require("express");
const router = express.Router();
require('dotenv').config();
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://blogAdmin:"+DB_PASSWORD+"@cluster0.wgyfb.mongodb.net/"+DB_NAME+"?retryWrites=true&w=majority";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function getMenu(res, uri, type){
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const collection = client.db(DB_NAME).collection("menu");
        const response = await collection.find({type: type}).toArray();
        res.render("menu", {menu: response});
        await client.close();
    } catch (err) {
        console.error(err);
    }
}

router.get("/", (req, res)=>{
    res.redirect("menu/pizza");
})

router.get("/pizza", (req, res)=>{
    getMenu(res, uri, "pizza");
})

router.get("/salad", (req, res)=>{
    getMenu(res, uri, "salad");
})

router.get("/chicken", (req, res)=>{
    getMenu(res, uri, "chicken");
})

router.get("/pasta", (req, res)=>{
    getMenu(res, uri, "pasta");
})

router.get("/burgers", (req, res)=>{
    getMenu(res, uri, "burgers");
})

router.get("/drinks", (req, res)=>{
    getMenu(res, uri, "drinks");
})

router.get("/cart", (req, res)=>{
    res.render("cart");
})

router.get("/checkout", async (req, res)=>{
    if(!req.session.cart){
        res.redirect("/menu");
        return;
    }
    const intent = await stripe.paymentIntents.create({
        amount: req.session.cart.totalPrice*100,
        currency: 'usd',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
      });
    res.render("checkout", { client_secret: intent.client_secret })
})

// router.get("/login", (req, res)=>{
//     res.render("login");
// })

// router.get("/signup", (req, res)=>{
//     res.render("signup");
// })

// router.get("/profile", (req, res)=>{
//     res.render("profile");
// })




module.exports = router;