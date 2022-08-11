const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, minlength:3, maxlength:255 },
    email: { type: String, minlength:3, maxlength:255,unique:true, },
    password: { type: String, minlength:3, maxlength:1024, },
    phone: { type: Number, minlength:10, unique:true,  maxlength:15, },
    address: { type: String, minlength:3, maxlength:555, },
    district: { type: String, minlength:3, maxlength:255, },
    country: { type: String, minlength:3, maxlength:255, },
    city: { type: String, minlength:3, maxlength:255, },
    state: { type: String, minlength:3, maxlength:255, },
    dob: { type: Number, minlength:3, maxlength:255, },
    qualification: { type: String, minlength:3, maxlength:255, },
    designation: { type: String, minlength:3, maxlength:255, },
    experience: { type: String, minlength:3, maxlength:255, },
    assignProject: { type: String, minlength:3, maxlength:255, },
    photo: { type: Object},
isAdmin: { type: Boolean,default:false },
isStaff: { type: Boolean,default:false },


 
},
{timestamps:true}

);


    const User = mongoose.model("User", userSchema);
    exports.User = User;
     

