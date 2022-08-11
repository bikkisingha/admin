import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addToCart } from "../slices/cartSlice";
//import { useGetAllProductsQuery } from "../slices/productsApi";
import {Link} from "react-router-dom";
const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
    const dispatch = useDispatch();
  const navigate = useNavigate();
 
  //const { data, error, isLoading } = useGetAllProductsQuery();
  //console.log("Api", isLoading);

  const handleAddToCart = (product) => {
    if (product.quantity > 0 && product.quantity <= product.stock) {
     
    dispatch(addToCart(product));

    
    navigate("/cart");
    }
    else {
      alert("Out of Stock");
    }
    
  };

     


  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>New Arrivals</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3> 
                    <span>{product.name}</span>
                  </h3>
                  <Link to={`/products/${product._id}`} />
                  <img src={product.image.url} alt={product.name} />
                  <div className="details">
                    <span>{product.description}</span>
                    <span className="price">₹{product.price}</span>
                     
                  </div>

                    

                   
                  <button onClick={() => handleAddToCart(product)}   >
                    Add to Cart 
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </div>
  );
};

export default Home;
