 
    import * as React from 'react';
    import { DataGrid } from '@mui/x-data-grid';
    import {useSelector} from "react-redux";
    import styled from 'styled-components';
    import {useDispatch} from "react-redux";
    import {useEffect} from "react";
    import EditUser from '../EditUser';
     
    import { useNavigate } from 'react-router';
 
import { usersFetch,usersDelete } from '../../../slices/usersSlice';
     
    export default function UsersList() {
         
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const {list} =useSelector(state => state.users);

        useEffect(()=>{
            dispatch(usersFetch());
        }
        ,[dispatch]);


        const rows= 
            list &&
            list.map(user=>{
            return {
                id:user._id,
                 StaffName:user.name,
                email:user.email,
                address:user.address,
                phone:user.phone,
                city:user.city,
                country:user.country,
                state:user.state,
                district:user.district,
                qualification:user.qualification,
                experience:user.experience,
                designation:user.designation,
                dob:user.dob,
                assignProject:user.assignProject,
                photo:user.image?.url,
                isAdmin:user.isAdmin,
                isStaff:user.isStaff,

             }})

            const columns = [
                { field: 'id', headerName: 'ID', width: 70 },
                
                 
                { field: 'StaffName',   headerName: 'name', width: 130 },
                {
                  field: 'email',
                  headerName: 'email',
                  type: 'string',
                  width: 90,
                },
                {
                    field: 'address', headerName: 'address', width: 90,
                },
                {
                    field: 'phone', headerName: 'phone', width: 90,

                },
                {
                    field: 'city', headerName: 'city', width: 90,
                },
                {
                    field: 'country', headerName: 'country', width: 90,
                },
                {
                    field: 'state', headerName: 'state', width: 90,
                },
                {
                    field: 'district', headerName: 'district', width: 90,
                },
                {
                    field: 'qualification', headerName: 'qualification', width: 90,
                },
                {
                    field: 'experience', headerName: 'experience', width: 90,
                },
                {
                    field: 'designation', headerName: 'designation', width: 90,
                },
                {
                    field: 'dob', headerName: 'dob', width: 90,
                },
                {
                    field: 'assignProject', headerName: 'assignProject', width: 90,
                },
                {
                    field: 'photo', headerName: 'image', width: 90,
                    renderCell: (params) => {
                        <ImageContainer> 

                        return <img src={params.row.photo} alt="phot"   />
                        </ImageContainer>
                    }

                },
                {
                    field: 'isAdmin',
                    headerName: 'isAdmin',
                    type: 'string',
                    width: 90,
                    renderCell:(params) =>{
                        return(
                            <div> 
                         { params.row.isAdmin ? <Admin>admin</Admin> : params.row.isStaff ?   <Customer>staff</Customer> : <Staff>customer</Staff> } 
                          


                            </div> 
                        );
                  },
                },
                {
                  field: 'actions',
                  headerName: 'Actions',
                  
                  sortable: false,
                  width: 160,
                  renderCell:(params) =>{
                    return(
                    <Actions>

                <Delete onClick={() => handleDelete(params.row.id)}>
               Delete
                </Delete >
                <EditUser userId={params.row.id} />
                
                <View onClick ={()=> navigate(`/user/${params.row.id}`)}>
                        View

                </View>
            </Actions>
                         
                    ); },
                   
                },];


              const handleDelete = (id) => {
                dispatch(usersDelete(id));
                
                 }
                  
                    

      return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      );
    }
    const Staff = styled.div`
    color: #ff0000;
    font-size: 12px;
    font-weight: bold;
    `;
    
    const ImageContainer = styled.div`
    img{
        height:50px;
    }
`;
     
const Actions = styled.div`

    display:flex;
    justify-content:space-between;
    align-list:center;
    width:400%;
    button{
        margin:0;
        padding:1px 1px;
        cursor:pointer;
    }
`;
const Delete = styled.button`

    background-color:red;
    color:white;
    border:none;
    border-radius:5px;
    `;
    const View=styled.button`
    background-color:green;
    color:white;
    border:none;
    border-radius:5px;
    `;
    const Admin=styled.div`

    background-color:green;
    color:white;
    border:none;
    border-radius:5px;
    `;
    const Customer=styled.div`

    background-color:red;
    color:white;
    border:none;
    border-radius:5px;
    `;
    const Edit = styled.button`

    background-color:green;
    color:white;
    border:none;
    border-radius:5px;
    `;
    
    



