const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const session = require("express-session");

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
        
        res.render("registration");

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
                mobile : req.body.mobile,
                password : newPassword,
                image : req.file.filename,
                is_admin : 0,
                name : req.body.name
            });

            const userData = await user.save();
            if(userData){
                res.render("registration",{message : " Your profile registered successfully. Please verify your email id. "});
            }else {
                res.render("registration", {message : " Your profile registration failed "});
            }

    } catch (error) {
        console.log(error.message);
    }

}

// login user methods

const loginPageLoad = async( req, res)=>{

    try {
        
        res.render("login");
        console.log("logged IN")

    } catch (error) {

        console.log(error.message);

        
    }
}

const loginVerify = async( req, res)=>{

    try {
        
        const userEmail = req.body.email;
        const userPassword = req.body.password;

        const userData = await User.findOne({ email: userEmail});
        console.log("verifying")

        if(userData){

            const passwordMatch = await bcrypt.compare( userPassword, userData.password);

            if(passwordMatch){

                res.redirect("home");
                console.log("password matched");

            }else{

                res.render("login", {message : "Entered email or password is incorrect"});
            }

        }else{
            res.render("login", {message : "Entered email or password is incorrect"});
        }



    } catch (error) {
        console.log(error.message);
    }

}

//home page loading

const homePage = async(req, res)=>{

    try {

        res.render("home" , { message : "Welcome to your home page."});
        console.log("home page loading");
    } catch (error) {
        console.log(error.message);
        
    }
}


module.exports = {
    loadRegister,
    insertUser,
    loginPageLoad,
    loginVerify,
    homePage

}