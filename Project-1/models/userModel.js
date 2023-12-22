const mongoose = require("mongoose");

//name,email,mob,password,confirm password,image

const userSchema = new mongoose.Schema({

        name:{
            type: String,
            required:[true, "Please enter your name"]
        },
        email:{
            type: String,
            required: [true, "Please enter your email id"],
            unique: true,
            lowercase:true
        },
        mobile :{
            type:Number,
            required:[true, "Type your mobile number"],
        },
        password:{
            type:String,
            required:[true, " Password is mandatory"],
            minlength: 8
        },

        image:{
            type:String
        },
        is_admin:{
            type:String,
            required:true
        }
});



    module.exports = mongoose.model("User",userSchema )