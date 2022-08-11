const express = require('express');
const router = express.Router();
const { isAdmin, isStaff } = require('../middleware/auth');

//decrease stock quantity of a product when an order is placed
router.put('/:id', isAdmin, async(req, res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,
              {
                $set: req.body,     
              },
              {new: true}
              );
        res.status(200).send(updatedOrder);

    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
);
//get all orders
 



module.exports = router;