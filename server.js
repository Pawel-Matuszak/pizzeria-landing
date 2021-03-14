require('dotenv').config();
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const SESSION_SECRET = process.env.SESSION_SECRET;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://blogAdmin:"+DB_PASSWORD+"@cluster0.wgyfb.mongodb.net/"+DB_NAME+"?retryWrites=true&w=majority";
const LEAFLET_ACCESS_TOKEN = process.env.LEAFLET_ACCESS_TOKEN;
const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const router = require("./routes/routes.js");
const menuRouter = require("./routes/menu.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const Cart = require("./models/cart.js");
const PORT = 8888;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.set('views', './public/views');
app.set('view engine', "ejs");
app.use(express.urlencoded({extended: false}));

const sess = {
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: uri,
        dbName: DB_NAME,
    }),
    cookie: {originalMaxAge: 3*60*60*1000},
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}
app.use(session(sess))

app.use(express.static(path.join(__dirname, "public")));
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
app.use("/menu", menuRouter); 
app.use("/", router);

// app.post("/create-payment-intent", async (req, res) => {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: req.session.cart.totalPrice,
//       currency: "usd"
//     });
//     res.send({
//       clientSecret: paymentIntent.client_secret
//     });
//   });

app.get("/leaflet", (req, res)=>{
    res.send({LEAFLET_ACCESS_TOKEN});
})

app.get("/add-to-cart/:id", async (req, res)=>{
    const productId = req.params.id;
    const cart = new Cart((req.session.cart) ? req.session.cart : []);

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const collection = client.db(DB_NAME).collection("menu");
    const product = await collection.findOne({_id: new ObjectId(productId)});

    cart.add(productId, product);
    req.session.cart = cart;
    res.redirect("back");
})

app.get("/remove-from-cart/:id", async (req, res)=>{
    const productId = req.params.id;
    const cart = new Cart((req.session.cart) ? req.session.cart : []);
    cart.remove(productId);
    req.session.cart = cart;
    if(req.session.cart.items.length<=0){
        req.session.cart = null;
    }
    res.redirect("back");
})

app.listen(PORT, ()=>{
    console.log("Listening on "+ PORT);
})