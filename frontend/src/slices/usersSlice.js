import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {setHeaders, url} from './api';
import {toast} from 'react-toastify';
 
const initialState = {
    list: [],
    status: null,
    deleteStatus: null,
    createStatus: null,
    editStatus: null,
     
       
};
export const usersFetch = createAsyncThunk("users/usersFetch", async () => {
    try {
        const response = await axios.get(`${url}/users`, setHeaders());
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);
// create user
export const usersCreate = createAsyncThunk("users/usersCreate", async (values) => {
    try {
        const response = await axios.post(`${url}/users`, values, setHeaders());
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

//edit user
export const usersEdit = createAsyncThunk("users/usersEdit", async (values,
     { getState}
    ) => {
    try {
    const state = getState();
    let currentUser = state.users.list.filter(user => user._id === values.id);
    const newUser = {
        ...currentUser[0],
        name: values.name,
        email: values.email,
        password: values.password,
        address: values.address,
        phone: values.phone,
        state: values.state,
        city: values.city,
        country: values.country,
        district: values.district,
        qualification: values.qualification,
        experience: values.experience,
        designation: values.designation,
        dob: values.dob,
        assignProject: values.assignProject,
        isAdmin: values.isAdmin,
        isStaff: values.isStaff,
        

         

         
    };
    try {
        const response = await axios.put(`${url}/users/${values.user._id}`, values, setHeaders());
        return response.data;
    } catch (error) {
        console.log(error);
    }
    } catch (error) {
        console.log(error);
    }
    
}
);




export const usersDelete = createAsyncThunk("users/usersDelete", async (id) => {
    try {
        const response = await axios.delete(`${url}/users/${id}`, setHeaders());
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [usersFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [usersFetch.fulfilled]: (state, action) => {
            state.list = action.payload;
            state.status = "success";
        },
        [usersFetch.rejected]: (state, action) => {
            state.status = "error";
        },
        [usersCreate.pending]: (state, action) => {
            state.createStatus = "pending";
        },
        [usersCreate.fulfilled]: (state, action) => {
            state.list.push(action.payload);
            state.createStatus = "success";
            toast.success("User created successfully");
        },
        [usersCreate.rejected]: (state, action) => {
            state.createStatus = "error";
        },
        [usersEdit.pending]: (state, action) => {
            state.editStatus = "pending";
        },
        [usersEdit.fulfilled]: (state, action) => {
            const updatedUser = state.list.map(
                (user) => 
                 user._id === action.payload._id ? action.payload : user );
            
          state.list = updatedUser;
            state.editStatus = "success";
            toast.success("User updated successfully");
        },
        [usersEdit.rejected]: (state, action) => {
            state.editStatus = "error";
        },

        [usersDelete.pending]: (state, action) => {
            state.deleteStatus = "pending";
        },
        [usersDelete.fulfilled]: (state, action) => {
            const newList = state.list.filter(user => user._id !== action.payload._id);
            state.list = newList;

            state.deleteStatus = "success";
        },
        [usersDelete.rejected]: (state, action) => {
            state.deleteStatus = "error";
        },
    },
}
);
export default usersSlice.reducer;





        