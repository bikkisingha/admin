import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders, url } from "./api";

 
const initialState = {
  items: [],
  status: null,
  createStatus: null,
  editStatus: null,
  deleteStatus: null,
  updateStatus: null,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(
         `${url}/products`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const productsCreate = createAsyncThunk(
  "products/productsCreate",
  async (values) => {
    try {
      const response = await axios.post(
        `${url}/products`, values,
        setHeaders(),
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const productsEdit = createAsyncThunk(
  "products/productsEdit",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/${values.product._id}`, values,
        setHeaders(),
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);


//products update after payment
 


export const productsDelete = createAsyncThunk(
  "products/productsDelete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${url}/products/${id}`, setHeaders()
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
//products update after payment
 

 
// stock update after payment
export const stockUpdate = createAsyncThunk(
  "products/stockUpdate",
  async (values) => {
    try {
      const response = await axios.put(
        `${url}/products/${values.product._id}`, values,
        setHeaders(),
         
      );
      
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);



const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [productsFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [productsCreate.pending]: (state, action) => {
      state.createStatus = "pending";
    },
    [productsCreate.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.createStatus = "success";
      toast.success("Product created") 
    },
    [productsCreate.rejected]: (state, action) => {
      state.createStatus = "rejected";
      toast.error("Product creation failed")
    },
    [productsEdit.pending]: (state, action) => {
      state.editStatus = "pending";
    },
    [productsEdit.fulfilled]: (state, action) => {
      const updatedProducts = state.items.map(
        (product) => product._id === action.payload._id ? action.payload : product 
  
      );
      state.items = updatedProducts;
      state.editStatus = "success";
      toast.success("Product updated")
    },
    [productsEdit.rejected]: (state, action) => {
      state.editStatus = "rejected";
      toast.error("Product update failed")
    },
    [stockUpdate.pending]: (state, action) => {
      state.updateStatus = "pending";
    } ,
    [stockUpdate.fulfilled]: (state, action) => {
      const updatedProducts = state.items.map(
        (product) => product._id === action.payload._id ? action.payload : product
      );
      state.items = updatedProducts;
      state.updateStatus = "success";
      toast.success("Stock updated")
    } ,

    [stockUpdate.rejected]: (state, action) => {
      state.updateStatus = "rejected";
      toast.error("Stock update failed")
    } ,

    [productsDelete.pending]: (state, action) => {
      state.deleteStatus = "pending";
    },
    [productsDelete.fulfilled]: (state, action) => {
     const newList = state.items.filter((item) => item._id !== action.payload);
      state.items = newList;
      state.deleteStatus = "success";
      toast.success("Product deleted")
    },
    [productsDelete.rejected]: (state, action) => {
      state.deleteStatus = "rejected";
      toast.error("Product deletion failed")
    }




  },
});

export default productsSlice.reducer;
