const mongoose = require('mongoose');
const productSchema =  new mongoose.Schema({
    name : {type:String, required:true, min:3, max:255},
    price: {type:Number, required:true, min:0},
    image: {type:Object, required:true, min:3, max:255},
    stock: {type:Number, required:true, min:1},
    MRP: {type:Number,   min:0},
    projectCategory: {type:String,   min:3, max:255},
    description: {type:String,   min:3, max:255},
     //update stock when order is placed
     

     
     
}
, {timestamps:true});
const Product = mongoose.model('Product', productSchema);
exports.Product = Product;



