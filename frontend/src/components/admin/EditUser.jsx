import * as React from 'react';
import Button from '@mui/material/Button';
 import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
 import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
 import { PrimaryButton } from "./CommonStyled";
import {useDispatch} from "react-redux";
 import {useState} from "react";
 import { useSelector } from 'react-redux';
import { usersEdit } from '../../slices/usersSlice';
 
export default function EditUser({userId}) {
  const dispatch = useDispatch();
 const [currentUser, setCurrentUser] = useState({});
 const [previewImg, setPreviewImg] = useState("");
  const [open, setOpen] = React.useState(false);
const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
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
   const [userImage, setUserImage] = useState("");
    
const {list,editStatus } = useSelector(state => state.users);

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
            setPreviewImg(reader.result);
        };
    }
    else{
        setUserImage("");
    }
};
const handleSubmit = (e) => { 
        e.preventDefault();
        dispatch(usersEdit({
             userImage,
             user:{
              ...currentUser,
              name:name, email:email,
                address:address,
                phone:phone,
                city:city,
                country:country,
                state:state,
                district:district,
                qualification:qualification,
                experience:experience,
                designation:designation,
                dob:dob,
                assignProject:assignProject,

                
              //image:userImage
             }
            }));
              
        };

  const handleClickOpen = () => {
    setOpen(true);
    
    let selectedUser =   list.filter(item => item._id === userId);
    selectedUser = selectedUser[0];
    setCurrentUser(selectedUser);
    setPreviewImg(selectedUser.image?.url);
    setUserImage("");
    setName(selectedUser.name);
    setEmail(selectedUser.email);
    setAddress(selectedUser.address);
    setPhone(selectedUser.phone);
    setCity(selectedUser.city);
    setCountry(selectedUser.country);
    setState(selectedUser.state);
    setDistrict(selectedUser.district);
    setQualification(selectedUser.qualification);
    setExperience(selectedUser.experience);
    setDesignation(selectedUser.designation);
    setDob(selectedUser.dob);
    setAssignProject(selectedUser.assignProject);

     
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Edit   onClick={handleClickOpen}>
Edit      </Edit>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"md"}>
        <DialogTitle>Edit user</DialogTitle>
        <DialogContent>
        <StyledEditUser >
            
            <StyledForm onSubmit={handleSubmit}>
            <h1>Edit User</h1>
            <input type="file" accept="image/" onChange={handleUserImageUpload}      />
                    <select onChange={(e)=> setDesignation(e.target.value)} value={designation} required>
                   <option value="">select Designation</option>
                    <option value="nike">staff</option>
                    <option value="adidas">ceo</option>
                    <option value="puma">developer</option>
                    </select>
                    <input type="text" placeholder="Name" onChange={(e)=> setName(e.target.value)} value={name}   />
                    <input type="text"   placeholder="  email" onChange={(e)=> setEmail(e.target.value)} value={email}   />
                    <input type="text" placeholder="  address" onChange={(e)=> setAddress(e.target.value)} value={address}   />
                    <input type="number" placeholder="  phone" onChange={(e)=> setPhone(e.target.value)} value={phone}   />
                    <input type="text" placeholder="  city" onChange={(e)=> setCity(e.target.value)} value={city}   />
                    <input type="text" placeholder="  country" onChange={(e)=> setCountry(e.target.value)} value={country}   />
                    <input type="text" placeholder="  state" onChange={(e)=> setState(e.target.value)} value={state}   />
                    <input type="text" placeholder="  district" onChange={(e)=> setDistrict(e.target.value)} value={district}   />
                    <input type="text" placeholder="  qualification" onChange={(e)=> setQualification(e.target.value)} value={qualification}   />
                    <input type="text" placeholder="  experience" onChange={(e)=> setExperience(e.target.value)} value={experience}   />
                    <input type="number" placeholder="  dob" onChange={(e)=> setDob(e.target.value)} value={dob}   />
                    <input type="text" placeholder="  assignProject" onChange={(e)=> setAssignProject(e.target.value)} value={assignProject}   />



                     <PrimaryButton type="submit">
                        {editStatus ? "Updating..." : "Update"}
                    </PrimaryButton>
    
    
            </StyledForm>
            <ImagePreview>
    {previewImg ? (
    <>
    <img src={previewImg} alt="user" />
    </>) : ( <p> image here</p>)
    }
            </ImagePreview>
             
    
            </StyledEditUser>
              
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Edit User</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const Edit = styled.div`
    color: #fff;
    background-color: #3f51b5;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
    &:hover {
        background-color: #2196f3;
    }
`;

const StyledEditUser = styled.div`

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

