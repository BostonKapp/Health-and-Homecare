const mongoose = require("mongoose");
const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
const axios = require("axios")

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute = "mongodb://heroku_wdttzc7v:vn20i2q90qldmse16k8v41tps1@ds151086.mlab.com:51086/heroku_wdttzc7v";

mongoose.connect(
    dbRoute, 
    {useNewUrlParser: true}
);

let db = mongoose.connection;

db.once("open", () =>
console.log("connected to the database"));

db.on("error", console.error.bind(console,"MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(logger("dev"));

//get method
router.get("/getData", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err});
        return res.json({ success: true, data: data});
    });
});

//update method
router.post("/updateData", (req, res) => {
    const { id, update } =req.body;
    Data.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err});
        return res.json({ success: true });
    });
});

//create method
router.post("/putData", (req, res) => {
    let data = new Data();

    const {id,  message} = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.message = message;
    data.id = id;
    data.save(err => {
        if (err) return res.json({ success: false, error: err});
        return res.json({ success: true});
    })
})

app.use("/api", router);

app.listen(8080, () => console.log("LISTENING ON PORT ${API_PORT"));
