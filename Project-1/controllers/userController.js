const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const session = require("express-session");
const config = require("../config/config");
const user_route = require("../routes/userRoutes.js");


const securePassword = async( password )=>{

    try {
        
        const passwordSecured = await bcrypt.hash(password,10);
        return passwordSecured;

    } catch (error) {
        console.log(error.message);
    }
}


const loadRegister = async(req,res)=>{

    try {
        
        res.render("register");

    } catch (error) {
        console.log(error.message)
    }
}

const insertUser = async(req,res)=>{

    try {

            const newPassword =   await securePassword(req.body.password);

            const user = new User({
                name : req.body.name,
                email : req.body.email,
                mobile : String(req.body.mobile),
                password : newPassword,
                image : req.file.filename,
                is_admin : false,
            });

            const userData = await user.save();
            if(userData){
                res.render("login",{message : " Your profile registered successfully. Please login now"});
            }else {
                res.render("register", {message : " Your profile registration failed "});
            }

    } catch (error) {
        console.log(error.message);
    }

}

// login user methods

const loginPageLoad = ( req, res)=>{
    res.render("login");
}

    

const loginVerify = async( req, res)=>{

    try {
        
        const email = req.body.email;
        const password = req.body.password;
       
        const userData = await User.findOne({ email: email, is_admin:false});
        console.log(userData);
        
        if(userData){
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if(passwordMatch){
                req.session.user = userData
                console.log(req.session);
                res.render("home", {userData});
            }else{
                res.render("login", { message : "Email or Password is incorrect"});
            }

        }else{
            res.render("login", { message : "Email or Password is incorrect"});
        }
        
    } catch (error) {
        console.log(error.message);
    }

}

//home page loading

const homePage =(req, res)=>{
    
    res.render("home" , { message : "Welcome to your home page "});
       
}



const logout = async(req, res)=>{

    try {

        req.session.destroy();
        res.redirect("/");
      
    } catch (error) {
        console.log(error.message);
        
    }
}


module.exports = {
    loadRegister,
    insertUser,
    loginPageLoad,
    loginVerify,
    homePage,
    logout

}