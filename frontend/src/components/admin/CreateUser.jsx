import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import {useDispatch} from "react-redux";
 import {useState} from "react";
import { usersCreate } from "../../slices/usersSlice";
import 'react-phone-number-input/style.css'
 

const CreateUser = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
   const [userImage, setUserImage] = useState("");
   const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [qualification, setQualification] = useState("");
    const [experience, setExperience] = useState("");
    const [designation, setDesignation] = useState("");
    const [dob, setDob] = useState("");
    const [assignProject, setAssignProject] = useState("");
     

    
     console.log(userImage);
   const handleUserImageUpload = (e) =>{
    const file = e.target.files[0];
    console.log(file);
    TransFormFile(file);

 };
const TransFormFile = (file) => {
    const reader=new FileReader()

    if(file){
        reader.readAsDataURL(file)
        reader.onloadend = () =>{
            setUserImage(reader.result);
        };
    }
    else{
        setUserImage("");
    }
};
const handleSubmit = (e) => { 
        e.preventDefault();
        dispatch(usersCreate({
            name, 
            address, email,
            phone, city,
            country, state,
            district, qualification,
            experience, designation,
            dob, assignProject,
             image:userImage}));
              
        };


 
    return (
        <StyledNewProduct  >
            
        <StyledForm onSubmit={handleSubmit}>
        <h1>Create Product</h1>
        <input type="file" accept="image/" onChange={handleUserImageUpload}  required />
                <select onChange={(e)=> setDesignation(e.target.value)} required>
               <option value="">select designation</option>
                <option value="nike">ceo</option>
                <option value="adidas">employee</option>
                <option value="puma">developer</option>
                </select>
                <input type="text" placeholder="  Name" onChange={(e)=> setName(e.target.value)} required />
                <input type="text" placeholder="  Address" onChange={(e)=> setAddress(e.target.value)} required />
                <input type="text" placeholder="  Email" onChange={(e)=> setEmail(e.target.value)} required />
                <input type="number" placeholder="  Phone" onChange={(e)=> setPhone(e.target.value)} required />
                 <input type="text" placeholder="  City" onChange={(e)=> setCity(e.target.value)} required />
                <input type="text" placeholder="  Country" onChange={(e)=> setCountry(e.target.value)} required />
                <input type="text" placeholder="  State" onChange={(e)=> setState(e.target.value)} required />
                <input type="text" placeholder="  District" onChange={(e)=> setDistrict(e.target.value)} required />
                <input type="text" placeholder="  Qualification" onChange={(e)=> setQualification(e.target.value)} required />
                <input type="text" placeholder="  Experience" onChange={(e)=> setExperience(e.target.value)} required />
                <input type="number" placeholder="  Dob" onChange={(e)=> setDob(e.target.value)} required />
                <input type="text" placeholder="  Assign Project" onChange={(e)=> setAssignProject(e.target.value)} required />

                 <PrimaryButton type="submit">
                    submit
                </PrimaryButton>


        </StyledForm>
        <ImagePreview>
{userImage ? (
<>
<img src={userImage} alt="product" />
</>) : ( <p> image here</p>)
}
        </ImagePreview>
         

        </StyledNewProduct>
          
    );
    };


 export default CreateUser;
    
const StyledNewProduct = styled.div`

display: flex;
justify-content: space-between;
`;

const StyledForm = styled.form`
display: flex;
flex-direction: column;
max-width: 300px;
margin-top: 20px;
`;

const ImagePreview = styled.div`
display: flex;
margin: 20px 0 20px 20px;
padding: 20px;
border: 1px solid #ccc;
width: 200px;
img{
    max-width: 100%;
}

`;

