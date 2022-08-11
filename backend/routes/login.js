const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const {User} = require('../models/user');
const genAuth = require('../utils/genAuth');

const router = express.Router();

router.post('/', async (req, res) => {
    const schema =  Joi.object({
        email: Joi.string().required().email().min(3).max(255),
        password: Joi.string().required().min(6).max(200),
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({email:req.body.email});
        

      if(!user){
         return res.status(400).send("invalid email or password");
      }

      const isValid= await bcrypt.compare(req.body.password, user.password);
        if(!isValid){
            return res.status(400).send("invalid email or password");
        }
        const token =  genAuth(user)
        res.send(token);
    }
    )
module.exports = router;
