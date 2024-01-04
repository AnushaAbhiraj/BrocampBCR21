const dotenv = require('dotenv');
const express = require("express");
const config = require("./config/config");
dotenv.config({path:"./.env"});
const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes");

//----------------------------------------------------------//

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log(" DB connected");

};
//---------------------------------------------------------------//


const app = express();

//for user routes
app.use("/",userRoute);
//for admin routes
app.use("/admin",adminRoute);
app.all("*", ( req,res )=>{
  res.status(404).json({
    status: failed,
    message:"This url doesnot exist "
  })
});



app.listen( 3000, ()=>{
    console.log(" Server started....");
});