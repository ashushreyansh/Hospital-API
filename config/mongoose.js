const mongoose = require("mongoose");

const uri = "mongodb+srv://ashushreyansh:zAgOaE1yR0iYLDiL@employeereviewsystem.wpuyz3o.mongodb.net/Hospital";

mongoose.connect(uri);

const db = mongoose.connection;

db.once("open", ()=>{
    console.log("connected to mongoDB cloud");
});

db.on("error", ()=>{
    console.log("Failed to connect to cloud DB");
});

module.exports = mongoose;