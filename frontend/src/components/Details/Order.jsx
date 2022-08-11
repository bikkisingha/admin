import {useState, useEffect} from 'react';
import axios from 'axios';
import { setHeaders, url } from '../../slices/api';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';


const Order = () => {
    const params= useParams();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            try{
        setLoading(true);
        const res=await axios.get(`${url}/orders/findOne/${params.id}`, 
        setHeaders());
         
        setOrder(res.data);
        setLoading(false);
                
            }
            catch(err){
                console.log(err);
            }
        }
        fetchOrder();
    }, [params.id]);




    return (
         <StyledOrder>
            {
                loading ? (<p>Loading...</p>
                ) :
                (
                    <>
                    <OrderContainer>
                        order details
                        <p>
                            delivery_status: {order.delivery_status==="pending" ? "pending" : order.delivery_status==="delivered" ? "delivered" : "cancelled"}
                        </p>
                        <p>
                            ordered products
                        </p>
                        {order.products?.map((product,index) => (
                            <p key={index}>

                                <span>{product.name}</span>
                                <span>{product.delivery_status}</span>
                                <span>{(product.amount_total /100).toLocaleString()}</span>
                                <span>{product.quantity}</span>
                                <span>{product.description}</span>
                                 </p>
                        ))}
                        <div>
                            <span>total</span>
                            <span>{(order.total /100).toLocaleString()}</span>
                        </div>
                        <div>
                            
                        </div>
                        <div>

                        
                        <h3>
                            delivery address
                        </h3> 
                        <p>
                            customer: {order.shipping?.name}
                        </p>
                        <p>
                            address: {order.shipping?.address}
                        </p>
                        <p>
                            city: {order.shipping?.city}
                        </p>
                        <p>
                            state: {order.shipping?.email}
                        </p>
                        </div>
                        </OrderContainer>
                    </>
                )
            }
         </StyledOrder>

    )
}
export default Order;



const StyledOrder = styled.div`
     
    display: flex;
    
    flex-direction: column;
    justify-content: space-between;
    `;
const OrderContainer = styled.div`
margin: 3rem;
display: flex;
justify-content: center;
`;




 