import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import {useDispatch} from "react-redux";
 import {useState} from "react";
import { productsCreate } from "../../slices/productsSlice";


const CreateProduct = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    //const [projectCategory, setProjectCategory] = useState("");
    //const [MRP, setMRP] = useState("");
    const [stock, setStock] = useState("");
     const [description, setDescription] = useState("");
   const [productImage, setProductImage] = useState("");
    
     console.log(productImage);
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
        };
    }
    else{
        setProductImage("");
    }
};
const handleSubmit = (e) => { 
        e.preventDefault();
        dispatch(productsCreate({
            name, price, 
            stock, 
             description,  
              productImage,
              
             image:productImage}));
              
        };


 
    return (
        <StyledNewProduct  >
            
        <StyledForm onSubmit={handleSubmit}>
        <h1>Create Product</h1>
        <input type="file" accept="image/" onChange={handleProductImageUpload}  required />
                {/* <select onChange={(e)=> setProjectCategory(e.target.value)} required>
               <option value="">select setProjectCategory</option>
                <option value="development">development</option>
                <option value="web3">web3</option>
                <option value="android">android</option>
                </select> */}
                <input type="text" placeholder="Product Name" onChange={(e)=> setName(e.target.value)} required />

                <input type="text"   placeholder="Product Price" onChange={(e)=> setPrice(e.target.value)}  required />
                <input type="text" placeholder="Product Description" onChange={(e)=> setDescription(e.target.value)} required />
                <input type="text" placeholder="Product Stock" onChange={(e)=> setStock(e.target.value)} required />
                 <PrimaryButton type="submit">
                    submit
                </PrimaryButton>


        </StyledForm>
        <ImagePreview>
{productImage ? (
<>
<img src={productImage} alt="product" />
</>) : ( <p> image here</p>)
}
        </ImagePreview>
         

        </StyledNewProduct>
          
    );
    };


 export default CreateProduct;
    
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

