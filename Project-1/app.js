// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/user_mgt_system');
  console.log(" DB connected");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` 
  //if your database has auth enabled
};
//---------------------------------------------------------------//

const express = require("express");


const app = express();

//for user routes
const userRoute = require("./routes/userRoutes");
app.use("/",userRoute);

app.listen( 3000, ()=>{
    console.log(" Server started....");
});