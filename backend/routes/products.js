const express = require('express');
const router = express.Router();
const {isAdmin, isStaff} = require('../middleware/auth');
const {Product} = require('../models/product');
 const cloudinary = require('../utils/cloudinary');

//create a new product
router.post('/',  isAdmin, isStaff,   async(req, res) => {
    const { name, price, MRP,stock,projectCategory, image, description } = req.body;
    try{
        if(image){
            const imageUrl = await cloudinary.uploader.upload(image,{
            upload_preset: 'productPic'
     }) 
            if(imageUrl){
                const product = new Product({
                    name,
                    price,
                    MRP,
                    stock,
                    projectCategory,
                    image: imageUrl,
                    description,
                    
                });
                const saveProduct = await product.save();
                res.status(200).send(saveProduct);
             }
            }

    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }

}
); 
router.get('/', async(req, res) => {
    try{
        const products = await Product.find();
        res.status(200).send(products);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
);
//get product by findById
router.get('/find/:id', async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        res.status(200).send(product);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
);

//Edit product


router.put('/:id', isAdmin, isStaff, async(req, res) => {
    

     if(req.body.productImage){
   try{

        const destroyImage = await cloudinary.uploader.destroy(req.body.product.image.public_id);
        if(destroyImage){
            const uploadedImage = await cloudinary.uploader.upload(req.body.productImage,{
                upload_preset: 'productPic'
            });
            if(uploadedImage){
                const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                      
                        $set: {
                            ...req.body.product,

                            image: uploadedImage,
                            
                        },

                      },
                        {new: true}
                );
                res.status(200).send(updatedProduct);
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
    }else{
        try{
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                $set:req.body.product,
                },
                {new: true}
            );
            res.status(200).send(updatedProduct);
        }catch(err){
            console.log(err);
            res.status(500).send(err);

        }
    }
});

//decrease stock quantity  





//delete product by findById
router.delete('/:id',isAdmin, async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return
            res.status(404).send('Product not found');
        }
        if(product.image.public_id){
           const deletedResponse= await cloudinary.uploader.destroy(product.image.public_id);
              if(deletedResponse){
                    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
                    res.status(200).send(deletedProduct);
                }
        }else{
            console.log("fILED TO DELETE PRODUCT IMAGE");
        }
    
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}
);

//decrease stock quantity of a product when an order is placed
//update stock quantity of a product when an order is placed
router.put('/decrease/:id', async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return
            res.status(404).send('Product not found');
        }
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: {
                stock: product.stock - req.body.quantity,
            },
        },
            {new: true}
        );
         res.status(200).send(updatedProduct);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }

}
);


//automatically update stock quantity of a product when an order is placed



//update stock when an order is placed
// router.put('/update/:id', async(req, res) => {
//     try{
//         const product = await Product.findById(req.params.id);
//         if(!product){
//             return
//             res.status(404).send('Product not found');
//         }
//         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
//             $set: {
//                 stock: product.stock + req.body.quantity,
//             },
//         },
//             {new: true}
//         );
//         res.status(200).send(updatedProduct);
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send(err);
//     }
// }
// );




module.exports = router;


