import {useState,useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import { registerUser } from '../../slices/authSlice';
import { StyledForm } from './styledForm';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth =useSelector((state)=>state.auth);
console.log(auth);
useEffect(()=>{
    if(auth._id){
        navigate('/register');
    }
}
,[auth._id, navigate]);


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        city: '',
        country: '',
        state: '',
        district: '',
        qualification: '',
        experience: '',
        designation: '',
        dob: '',
        assignProject: '',
        

    });
    console.log(user);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(user));
         

         
    }

    return (
        <div>
        
        <StyledForm onSubmit={handleSubmit}> 
        <h1>Register</h1>
        
            <input type="name" placeholder="Username" onChange={(e)=> setUser({...user, name: e.target.value}) } />
            <input type="email" placeholder="Email" onChange={(e)=> setUser({...user,email:e.target.value})} />

            
            <input type="text" placeholder="Address" onChange={(e)=> setUser({...user,address:e.target.value})} />
            <input type="text" placeholder="Phone" onChange={(e)=> setUser({...user,phone:e.target.value})} />
            <input type="text" placeholder="City" onChange={(e)=> setUser({...user,city:e.target.value})} />
            <input type="text" placeholder="Country" onChange={(e)=> setUser({...user,country:e.target.value})} />
            <input type="text" placeholder="State" onChange={(e)=> setUser({...user,state:e.target.value})} />
            <input type="text" placeholder="District" onChange={(e)=> setUser({...user,district:e.target.value})} />
            <input type="text" placeholder="Qualification" onChange={(e)=> setUser({...user,qualification:e.target.value})} />
            <input type="text" placeholder="Experience" onChange={(e)=> setUser({...user,experience:e.target.value})} />
            <select type="text" placeholder="Designation" onChange={(e)=> setUser({...user,designation:e.target.value})} >
                <option value="">Select Designation</option>
                <option value="Accountants">Accountants</option>
                <option value="Manager">Manager</option>
                 
    
            </select>
             
            <input type="number" placeholder="DOB" onChange={(e)=> setUser({...user,dob:e.target.value})} />
            <input type="text" placeholder="Assign Project" onChange={(e)=> setUser({...user,assignProject:e.target.value})} />
            <input type="password" placeholder="Password" onChange={(e)=> setUser({...user,password:e.target.value})}/>
            <button> 
            {
                auth.registerStatus === 'pending' ?  "submitting..." : "register"
            }
            </button>
            
            {
                auth.registerStatus === 'error' ?  <p>{auth.registerError}</p> : null

            }
        </StyledForm>
        </div>
    );
    }
    export default Register;

    