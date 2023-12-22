const express = require("express")
const userController = require("../controllers/userController")
const bodyParser = require("body-parser");
const multer = require("multer");

const user_route = express();

user_route.set("view engine","ejs");
user_route.set("views","./views/user")


user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));


const path = require("path");

const storage = multer.diskStorage({
    destination : ( req, file, cb)=>{
        cb(null,path.join(__dirname,"../public/userImages"));

    },
    filename: ( req, file, cb)=>{
        const name = Date.now()+ file.originalname;
        cb(null, name);

    }
});

const upload = multer({storage: storage});


user_route.get("/register",userController.loadRegister);
user_route.post("/register", upload.single("image"),userController.insertUser);

user_route.get("/",userController.loginPageLoad);
user_route.get("/login",userController.loginPageLoad);

user_route.post("/login",userController.loginVerify);

user_route.get("/home", userController.homePage );



module.exports = user_route;