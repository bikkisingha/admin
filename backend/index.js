const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const products = require("./products");
 const register = require("./routes/register");
const login = require("./routes/login");
const productsRoute=require("./routes/products");
const stripe = require("./routes/stripe");
const users=require("./routes/users");
 const orders=require("./routes/orders");

const app = express();

app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/products", productsRoute);
app.use("/api/stripe", stripe);
app.use("/api/users", users);
app.use("/api/orders", orders);

 



app.get("/", (req, res) => {
  res.send("Welcome our to  product   API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});
 
const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;
app.listen(port, console.log(`Server running on port ${port}`));

mongoose.connect(uri,
   { useNewUrlParser: true, useUnifiedTopology: true 
  }).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error: " + err));

