const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const session = require("express-session");
const randomstring = require("randomstring")

const securePassword = async( password )=>{

    try {
        
        const passwordSecured = await bcrypt.hash(password,10);
        return passwordSecured;

    } catch (error) {
        console.log(error.message);
    }
}


const loadAdminLogin = async(req,res)=>{

    try {
        
        res.render("login");

    } catch (error) {
        console.log(error)
    }
};

const verifyAdminLogin = async( req, res)=>{

    try {
        
        const username = req.body.username;
        const password = req.body.password;

        const userData = await User.findOne({ email : username , is_admin: true });
        const passwordMatch = await bcrypt.compare(password, userData.password);

        console.log(userData)
       
        if(passwordMatch){
            if(userData){
                
                res.redirect("/admin/admindashboard")
            }else{
                res.render("login", {message : "Email or password is incorrect"});
            }
            
        }else{
            
            res.render("login", {message : "Email or password is incorrect"});
        }
            
    } catch (error) {
        console.log(error.message);
    }

};

const loadDashboard = async( req,res )=>{

try {
    const userData = await User.find({ is_admin : false});
    console.log(userData);
    res.render("dashboard", { user : userData} );
} catch (error) {
    console.log(error)
}
  
};


//add new user
const newuserLoad = (req,res)=>{
    res.render("newuser");
   
}

const addnewUser = async(req,res)=>{
    try {
        const name = req.body.name;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const image = req.file.filename;
        const password = randomstring.generate(8);

        const spassword = await securePassword(password)

        const user = new User({
            name:name,
            email:email,
            mobile:mobile,
            image:image,
            password:spassword

        });

        const userData = await user.save();


        if(userData){
            res.redirect("/admin/admindashboard")

        }else{
            res.render("newuser",{ message : " something went wrong"})
        }
        

        
    } catch (error) {
        console.log(error.message);
    }
}

const loadEditUser = async(req, res)=>{
    try {

        const id = req.query.id;
        const userData=  await User.findById({_id : id});
        if(userData)
           return res.render("edituser", {user : userData});

           res.redirect("/admin/admindashboard");

        
       
    } catch (error) {
        console.log(error.message)
    }
}

const updateUser = async( req,res )=>{
    try {
        const updatedData = await User.findByIdAndUpdate({ _id : req.body.id}, {$set:{ name: req.body.name, email: req.body.email, mobile: req.body.mobile}},{new :true, runValidators:true});
        console.log(updatedData, "2");
        res.redirect("/admin/admindashboard");
    } catch (error) {
        console.log(error, "1");
    }

}

const deleteUser = async( req,res )=>{
    try {
        
        const id = req.query.id;
        console.log(id,"www");
        await User.deleteOne({ _id:id});
        res.redirect("/admin/admindashboard");

    } catch (error) {
        console.log(error.message)
        
    }

}
    

const adminLogout = async( req, res )=>{

    try {
        
        res.render("login" , {message : " You are logged out "});
    } catch (error) {
        console.log(error.message);
    }
}





module.exports = {
    loadAdminLogin,
    verifyAdminLogin,
    loadDashboard,
    adminLogout,
    newuserLoad,
    addnewUser,
    loadEditUser,
    updateUser,
    deleteUser
}