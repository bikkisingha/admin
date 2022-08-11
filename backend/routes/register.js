const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const {User} = require('../models/user');
const genAuth = require('../utils/genAuth');
const cloudinary = require('../utils/cloudinary');
const router = express.Router();

router.post('/', async (req, res) => {
    const schema =  Joi.object({
        name : Joi.string().required().min(3).max(255),
        email: Joi.string().required().email().min(3).max(255),
        password: Joi.string().required().min(6).max(200),
        phone : Joi.number().min(10).max(15).required(),
        address : Joi.string().min(3).max(255),
        district : Joi.string().min(3).max(255),
        city : Joi.string().min(3).max(255),
        state : Joi.string().min(3).max(255),
        dob : Joi.number().min(3).max(255),
        qualification : Joi.string().min(3).max(255),
        designation : Joi.string().min(3).max(255),
        experience : Joi.string().min(3).max(255),
        assignProject : Joi.string().min(3).max(255),
        photo : Joi.object(),

    });

    

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
     

    let user = await User.findOne({email:req.body.email});
    if(user)
        return res.status(400).send("user exist");

       user= new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address,
            district: req.body.district,
            city: req.body.city,
            state: req.body.state,
            dob: req.body.dob,
            qualification: req.body.qualification,
            designation: req.body.designation,
            experience: req.body.experience,
            assignProject: req.body.assignProject,
            photo: req.body.photo,

        });
         const salt = await bcrypt.genSalt(10)
            user.password = await  bcrypt.hash(user.password, salt);

         user = await user.save();

    if(!user){
        return res.status(400).send("invalid email or password");
    }

    const isValid= await bcrypt.compare(req.body.password, user.password);
    if(!isValid){
        return res.status(400).send("invalid email or password");
    }
    const token =   genAuth(user)
    res.send(token);
}
)
module.exports = router;



