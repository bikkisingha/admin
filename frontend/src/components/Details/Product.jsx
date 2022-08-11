

import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { setHeaders, url } from '../../slices/api';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { addToCart } from '../../slices/cartSlice';
import { toast } from 'react-toastify';

const Product = () => {
     const params= useParams();
     const navigate = useNavigate();
    const dispatch = useDispatch();
     const [product, setProduct] = useState({});
     const [loading, setLoading] = useState(false);
     console.log(product);
     console.log(loading);


const handleAddToCart = (product) => {
    if(product.quantity > 0 && product.quantity <= product.stock){
        dispatch(addToCart(product));
        navigate('/cart');
    }
    else{
        toast.error('Out of Stock');
    }

// dispatch(addToCart(product));
//navigate('/cart');
};


// update stock 
 



    useEffect(() => {
        setLoading(true);
        async function fetchData() {
           try{
                const res=await axios.get(`${url}/products/find/${params.id}`, setHeaders());
                setProduct(res.data);
            }
            catch(err){

                console.log(err);
            }
            setLoading(false);
        }
        fetchData();

    }, [params.id]);


    return (
             <StyledProduct>
                 
             <ProductContainer>
                    {
                        loading ? (<p>Loading...</p> 
                        ) :
                        (
                         <>
                        <ImageContainer>
                            <img src={product.image?.url} alt="product" />
                        </ImageContainer>

                        <ProductDetails>
                            <h3>{product.name}</h3>
                             <span>
                                Stock:  
                            </span>
                            {product.stock?.toLocaleString() - product.quantity?.toLocaleString()}
                             

                             
                             
                            {/* <span>
                                category
                            </span>
                            {product.projectCategory} */}

                            
                            <span>
                                Price:
                                </span> 
                                <Price>
                                    ${product.price?.toLocaleString()}
                                </Price>
                                 
                            
                            <span>
                                Description:
                                </span>  
                                {product.description} 
                            <div>

                            
                            <button className='add-to-card' onClick={() => handleAddToCart(product)}>
                                Add to Cart

                            </button>
                            </div>
                        </ProductDetails>
                        </>
                    )}
                 
                </ProductContainer> 
            
            </StyledProduct>
         
         
    );
    }
export default Product;
const StyledProduct = styled.div`
margin: 3rem;
display: flex;
justify-content: center;
`;
const ProductContainer = styled.div`
display: flex;
max-width: 500%;
height: auto;
border-radius: 10px;
background-color: #f5f5f5;

`;
const ImageContainer = styled.div`
flex: 1;
img{
    width: 100%;    
}
`;
const ProductDetails = styled.div`
flex: 2;
margin-left: 1rem;
h3{
    font-size: 2.5rem;
    font-weight: bold;
}
p span{
    font-weight: bold;
}


`;

const Price = styled.div`   
margin: 1rem;
font-size: 2rem;
font-weight: bold;
`;