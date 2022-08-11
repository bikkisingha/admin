const { json } = require('express');
const express = require('express');
const Stripe = require('stripe');
require('dotenv').config();
const stripe= Stripe(process.env.STRIPE_KEY);
const router = express.Router();
const nodeMailer = require('nodemailer');
const {Order} = require('../models/order');

router.post('/create-checkout-session', async (req, res) => {
    const customer = await stripe.customers.create({
        metadata:{
            userId: req.body.userId.toString(),
            

        }
    });
    const line_items = req.body.cartItems.map((item) => {
        return {
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                images: [item.image.url],
                 description: item.description,
                metadata:{
                    id: item.id
                }
            },
            unit_amount: item.price * 100,
        },
        quantity: item.cartQuantity,
        };
        
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'IN'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          }
        }
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          }
        }
      },
    ],
    phone_number_collection: {
        enabled: true,
      },
      
      customer: customer.id,
       line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    }

    );

  
    res.json({url: session.url});
  });


  //webhook

   //create order
   const createOrder = async (customer, data, lineItems) => {
     
 
    const newOrder = new Order({  
        userId: customer.metadata.userId,
         products: lineItems.data,
        customerId: data.customer,
        paymentIntendId: data.payment_intent,
        subtotal: data.amount_subtotal,
        total: data.amount_total,
        shipping: data.customer_details,
        quantity: data.quantity,
        payment_status: data.payment_status,
    }
    );
    try{
      const saveOrder =  await newOrder.save();
        
        console.log(saveOrder);

    }
    catch(err){
        console.log(err);
    }


  };

 
 

 
// This is your Stripe CLI webhook secret for testing your endpoint locally.

let endpointSecret;
//const endpointSecret =
 //"whsec_51b7414a16ca28df707e2f5f1091fd64104356edacdfc17e4575ae6aa492b899";

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;
if(endpointSecret){
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("webhook verified");
  } catch (err) {
    console.log("webhook error");

    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
    data = event.data.object;
    eventType = event.type;
}
else{
data=req.body.data.object;
eventType=req.body.type;

}
if(eventType==="checkout.session.completed") 
{
  try{
    async() => {

  
 let  emailto = data.customer_details.email;

  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });
   // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: emailto, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
    }
    console.log("Message sent: %s", info.messageId);

}catch(err){
  console.log(err);
}



stripe.customers.retrieve(data.customer).then(
  (customer)=>{
     
     stripe.checkout.sessions.listLineItems(
      data.id,
       {},
        
       
      //limit
      function(err, lineItems) {
        console.log(lineItems);
        createOrder(customer,data,lineItems);

       }
    );
    
    console.log(customer);
    console.log(data);
 


}
).catch(err=>{
    console.log(err);
}
);
}

   
  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
});

   
  module.exports = router;