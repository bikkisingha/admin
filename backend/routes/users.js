const {User} = require('../models/user');
const express = require('express');
const {auth,isUser,isStaff, isAdmin} = require('../middleware/auth');
const moment = require('moment');
const router = express.Router();

//get all users
router.get('/', isAdmin,isStaff, async(req, res) => {
    try{
        const users = await User.find().sort({ _id: -1});
        res.status(200).send(users);
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
);
//get user
router.get('/find/:id', isAdmin, isStaff, async(req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            dob: user.dob,
            phone: user.phone,
            city: user.city,
            state: user.state,
            designation: user.designation,
            experience: user.experience,
            assignProject: user.assignProject,
            qualification: user.qualification,
            isAdmin: user.isAdmin,
            isStaff: user.isStaff,
            
            

        });
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
);
//update user
router.put('/:id', isAdmin, isStaff, async(req, res) => {
    
    try{
        const user = await User.findById(req.params.id);
              if(!(user.email===req.body.email)){
                const emailInUse = await User.findOne({email: req.body.email});
                if(emailInUse)
                    return res.status(400).send('Email already in use');
                }
                if(req.body.password && user){
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(req.body.password, salt);
                    user.password = hashedPassword;
                }
                const updatedUser = await User.findByIdAndUpdate(req.params.id,
                        {
                            name: req.body.name,
                            email: req.body.email,
                            address: req.body.address,
                            phone: req.body.phone,
                            city: req.body.city,
                            state: req.body.state,
                            district: req.body.district,
                            dob: req.body.dob,
                            designation: req.body.designation,
                            assignProject: req.body.assignProject,
                            experience: req.body.experience,
                            qualification: req.body.qualification,
                            isAdmin: req.body.isAdmin,
                            password: user.password,
                        },
                        {new: true}
                        );


        res.status(200).send( 
            {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                address: updatedUser.address,
                phone: updatedUser.phone,
                city: updatedUser.city,
                state: updatedUser.state,
                district: updatedUser.district,
                dob: updatedUser.dob,
                designation: updatedUser.designation,
                assignProject: updatedUser.assignProject,
                experience: updatedUser.experience,
                qualification: updatedUser.qualification,
                
                isAdmin: updatedUser.isAdmin,
            }



        );

    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
);
//delete user
router.delete('/:id', isAdmin, async(req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).send(deletedUser);

    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

);

//create order
 




module.exports = router;


