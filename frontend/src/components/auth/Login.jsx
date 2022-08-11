import {useState,useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import { loginUser } from '../../slices/authSlice';
import { StyledForm } from './styledForm';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth =useSelector((state)=>state.auth);
console.log(auth);

useEffect(()=>{
    if(auth._id){
        navigate('/cart');
    }
}
,[auth._id, navigate]);


    const [user, setUser] = useState({
         
        email: '',
        password: '',
    });
    console.log(user);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(user));
         

         
    }

    return (
        <div>
        
        <StyledForm onSubmit={handleSubmit}> 
        <h1>Login</h1>
             
            <input type="email" placeholder="Email" onChange={(e)=> setUser({...user,email:e.target.value})} />
            <input type="password" placeholder="Password" onChange={(e)=> setUser({...user,password:e.target.value})}/>
            <button> 
            {
                auth.loginStatus === 'pending' ?  "submitting..." : "Login"
            }
            </button>
            
            {
                auth.loginStatus === 'error' ?  <p>{auth.loginError}</p> : null

            }
        </StyledForm>
        </div>
    );
    }
    export default Login;

    