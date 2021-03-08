require('dotenv').config();
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
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

app.set('view engine', "ejs");
app.set('views', './public/views');
app.use(express.urlencoded({extended: false}));
app.use("/menu", menuRouter);
app.use("/", router);
app.set('trust proxy', 1);
app.use(session({
    secret: 'secrethgrtd',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: uri
    }),
    cookie: {
        maxAge: 10*60*60*1000, 
        // secure: true, 
    },
  }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next)=>{
    res.locals.session = req.session;
    next();
})

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

    cart.add(productId, product.price);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/menu");
})

app.listen(PORT, ()=>{
    console.log("Listening on "+ PORT);
})