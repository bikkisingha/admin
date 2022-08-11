import "./App.css";
import { BrowserRouter, Route,  Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Cart from "./components/Cart";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import CheckoutSuccess from "./components/CheckoutSuccess";
import ProductsList from "./components/admin/list/ProductsList";
import Orders from "./components/admin/Orders";
import Users from "./components/admin/Users";
import Product from "./components/Details/Product";
import Order from "./components/Details/Order";
import UserProfile from "./components/Details/User";
import UsersList from "./components/admin/list/UsersList";
import CreateUser from "./components/admin/CreateUser";
import Projects from "./components/admin/Projects";
import Designation from "./components/admin/Designation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <div className="content-container">
          <Routes>
            
            <Route path="*" element={ <NotFound />} />
            <Route path="/" exact element={<Home />} />
            <Route path="/cart" element={ <Cart />} />
            <Route path="/checkout-success" element={ <CheckoutSuccess />} />
            <Route path="/login" element={<Login/>} />
             <Route path="/product/:id" element={<Product/>} />
            <Route path="/order/:id" element={<Order/>} />
            <Route path="/user/:id" element={<UserProfile/>} />
            <Route path="register" element={<Register />} />
            <Route path="/admin" element={<Dashboard/>} >
              <Route path="projects" element={<Projects/>} />
              <Route path="designation" element={<Designation/>} />

              <Route path="products" element={<Products />} >
                <Route index element ={<ProductsList />} />
                <Route path="add-product" element={<CreateProduct />} />
              </Route>
              <Route path="users" element={<Users />} >
                <Route index element ={<UsersList />} />
                <Route path="add-user" element={<CreateUser />} />
              </Route>
              <Route path="orders" element={<Orders />} />
              <Route path="login" element={<Login/>} />
              <Route path="summary" element={<Summary/>} />
              <Route path="register" element={<Register />} />
            </Route>
             


             
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
