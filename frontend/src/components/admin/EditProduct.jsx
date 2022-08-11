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
import { productsEdit } from '../../slices/productsSlice';
 
export default function EditProduct({prodId}) {
  const dispatch = useDispatch();
 const [currentProd, setCurrentProd] = useState({});
 const [previewImg, setPreviewImg] = useState("");
  const [open, setOpen] = React.useState(false);
const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [projectCategory, setProjectCategory] = useState("");
    const [MRP, setMRP] = useState("");
     const [description, setDescription] = useState("");
   const [productImage, setProductImage] = useState("");
    
const {items,editStatus } = useSelector(state => state.products);

    const handleProductImageUpload = (e) =>{
    const file = e.target.files[0];
    console.log(file);
    TransFormFile(file);

 };
const TransFormFile = (file) => {
    const reader=new FileReader()

    if(file){
        reader.readAsDataURL(file)
        reader.onloadend = () =>{
            setProductImage(reader.result);
            setPreviewImg(reader.result);
        };
    }
    else{
        setProductImage("");
    }
};
const handleSubmit = (e) => { 
        e.preventDefault();
        dispatch(productsEdit({
             productImage,
             product:{
              ...currentProd,
              name:name, price:price,
              MRP:MRP, stock:stock,
              description:description,
              projectCategory:projectCategory,
              //image:productImage
             }
            }));
              
        };

  const handleClickOpen = () => {
    setOpen(true);
    let selectedProd = items.filter(item => item._id === prodId);
    selectedProd = selectedProd[0];
    setCurrentProd(selectedProd);
    setPreviewImg(selectedProd.image.url);
    setProductImage("");
    setName(selectedProd.name);
    setPrice(selectedProd.price);
    setMRP(selectedProd.MRP);
    setStock(selectedProd.stock);
    setProjectCategory(selectedProd.projectCategory);

    setDescription(selectedProd.description);

  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Edit   onClick={handleClickOpen}>
Edit      </Edit>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"md"}>
        <DialogTitle>Edit product</DialogTitle>
        <DialogContent>
        <StyledEditProduct >
            
            <StyledForm onSubmit={handleSubmit}>
            <h1>Edit Product</h1>
            <input type="file" accept="image/" onChange={handleProductImageUpload}     />
                    <select onChange={(e)=> setProjectCategory(e.target.value)} value={projectCategory} required>
                   <option value="">select projectCategory</option>
                    <option value="development">development</option>
                    <option value="web3">web3</option>
                    <option value="android">android</option>
                    </select>
                    <input type="text" placeholder="Product Name" onChange={(e)=> setName(e.target.value)} value={name} required />

                    <input type="text"   placeholder="Product Price" onChange={(e)=> setPrice(e.target.value)} value={price} required />
                    <input type="text" placeholder="Product Description" onChange={(e)=> setDescription(e.target.value)} value={description} required />
                    <input type="text" placeholder="Product MRP" onChange={(e)=> setMRP(e.target.value)} value={MRP} required />
                    <input type="text" placeholder="Product Stock" onChange={(e)=> setStock(e.target.value)} value={stock} required  />

                     <PrimaryButton type="submit">
                        {editStatus ? "Updating..." : "Update"}
                    </PrimaryButton>
    
    
            </StyledForm>
            <ImagePreview>
    {previewImg ? (
    <>
    <img src={previewImg} alt="product" />
    </>) : ( <p> image here</p>)
    }
            </ImagePreview>
             
    
            </StyledEditProduct>
              
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Edit product</Button>
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

const StyledEditProduct = styled.div`

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

