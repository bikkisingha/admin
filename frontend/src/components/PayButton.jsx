import axios from "axios";
 import { url } from "../slices/api";
 import {  useSelector } from "react-redux";



const PayButton = ({cartItems}) => {
    const user = useSelector((state) => state.auth);
     
    const handleCheckout = () => {
        axios.post(`${url}/stripe/create-checkout-session`, {
             cartItems, userId: user._id }).then((res) => {
                if(res.data.url){
                    window.location.href = res.data.url;
                }
                
            }
        ).catch((err) => {
            console.log(err);
        }
        );



        console.log(cartItems);


    }


    return (
        <div className="pay-button">
            <button  onClick={()=> handleCheckout()} >Pay </button>
        </div>
    )
}
export default PayButton;
