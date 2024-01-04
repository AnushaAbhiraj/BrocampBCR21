const express = require("express");
const adminController = require("../controllers/adminController");
const session = require("express-session");
const bodyParser = require("body-parser");
const config = require("../config/config");
const multer = require("multer");
const path = require("path");

const admin_route = express();

admin_route.set("view engine","ejs");
admin_route.set("views","./views/admin");

admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended : true}));


admin_route.use(session({   secret : config.sessionSecret ,
                            resave : false,
                            saveUninitialized : false,
                            cookie : {
                                    maxAge : 1000*60*60*24
                            }}));

admin_route.use(express.static("public"));

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



admin_route.get("/", adminController.loadAdminLogin);

admin_route.post("/adminlogin", adminController.verifyAdminLogin);
admin_route.get("/admindashboard", adminController.loadDashboard);

admin_route.get("/logout", adminController.adminLogout);

admin_route.get("/newuser", adminController.newuserLoad);
admin_route.post("/newuser" , upload.single("image") ,adminController.addnewUser);

admin_route.get("/edituser", adminController.loadEditUser);
admin_route.post("/edituser", adminController.updateUser);

admin_route.get("/deleteuser", adminController.deleteUser);






module.exports = admin_route;