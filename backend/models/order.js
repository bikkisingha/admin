const mongoose = require('mongoose');
const orderSchema =  new mongoose.Schema({
    userId: {type:String, required:true},
    customerId: {type:String},
    name: {type:String, min:3, max:255},
    paymentIntendId: {type:String},
     
    products:[
        // {
        //     id: {type:String},
        //     name: {type:String},
        //     price: {type:Number},
        //     cartQuantity: {type:Number},
            
        //     image: {type:String},
        //     description: {type:String},
        //     brand: {type:String},
        // },

    ],
    subtotal: {type:Number,  },
     total: {type:Number,  min:0},
     shipping: {type:Object,  },
    delivery_status: {type:String,  default:"pending"},
    payment_status: {type:String, },
    quantity: {type:Number,  min:1,},

}
, {timestamps:true});

const Order = mongoose.model('Order', orderSchema);
exports.Order = Order;
