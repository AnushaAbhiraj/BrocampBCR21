const mongoose = require("mongoose");
const validator = require("validator");

//name,email,mob,password,confirm password,image

const userSchema = new mongoose.Schema({

        name:{
            type: String,
            required:[true, "Please enter your name"],
            minlength:3,
            maxlength:16,
            validate : [validator.isAlpha, "Name should only contain alphabets "]
        },
        email:{
            type: String,
            required: [true, "Please enter your email id"],
            unique: true,
            lowercase:true,
            validate : [validator.isEmail, " Email should be validated "]
        },
        mobile :{
            type: Number,
            required:[true, "Type your mobile number"],
            trim: true,
            maxlength:10,
            validate : {
                validator : function checkPhoneNum(str) {
                    return str && validator.isNumeric(str.toString());
                    // return str && validator.isMobilePhone(str.toString(), 'zh-CN');
                   },
                   message : "Check your mobile number "
            }
        },
        password:{
            type:String,
            required:[true, " Password is mandatory"],
            validate : {
                validator : function(value){
                    const pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);
                    return pattern.test(value);
            },
            message: "password should contain more than 8 characters with atleast one uppercase letter, one lowercase letter, one number."
        }
    },

        image:{
            type:String 
        },
        is_admin:{
            type: Boolean,
            required:true,
            default: false
           
        }
});



    module.exports = mongoose.model("User",userSchema );