const express = require('express');
const {Order} = require('../models/order');
const {auth,isUser, isStaff,isAdmin} = require('../middleware/auth');
const router = express.Router();
const moment = require('moment');
const {Product} = require('../models/product');

//get order
router.get('/', isAdmin,   async(req, res) => {
    const query = req.query;
    try{
        const orders= query.status ? await Order.find().sort({ _id: -1}).limit(10) : await Order.find().sort({_id:-1});
        res.status(200).send(orders);

    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
);

//updated order
router.put('/:id', isAdmin, isStaff, async(req, res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
             
             {
                $set: req.body,     

             },
             
             {new: true}
             );
        res.status(200).send(updatedOrder);

    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
);
//get order


//get an order 
router.get('/findOne/:id', auth,   async(req, res) => {
    try{
        const order = await Order.findById(req.params.id);
        if(req.user._id !== order.userId || !req.user.isAdmin || !req.user.isStaff || !req.user.isUser)
            return res.status(401).send('Unauthorized');


        res.status(200).send(order);

    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

);
//decrease stock quantity of a product when an order is placed
router.put('/decrease/:id', auth, async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(product.stock < 1)
            return res.status(400).send('Product out of stock');
       product.stock = product.stock - req.body.quantity;
        const updatedProduct = await product.save();
        res.status(200).send(updatedProduct);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
);



module.exports = router;