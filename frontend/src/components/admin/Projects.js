import {usersFetch} from '../../slices/usersSlice';
import {useDispatch,useSelector} from 'react-redux';
import {useEffect} from 'react';
import * as React from 'react';
import styled from 'styled-components';
import { DataGrid } from '@mui/x-data-grid';
import {useNavigate} from 'react-router';
 
export default function Projects() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {list} =useSelector(state => state.users);

    useEffect(()=>{
        dispatch(usersFetch());
    }
    ,[dispatch]);
    const rows=list?.map(user=>{
        return {
            id:user._id,
            StaffName:user.name,
            email:user.email,
            
            qualification:user.qualification,
            experience:user.experience,
            designation:user.designation,
            assignProject:user.assignProject,
             
            isAdmin:user.isAdmin,
            isStaff:user.isStaff,
        }} )
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'StaffName',   headerName: 'name', width: 130 },
        { field: 'email',   headerName: 'email', width: 130 },
        { field: 'qualification',   headerName: 'qualification', width: 130 },
        { field: 'experience',   headerName: 'experience', width: 130 },
        { field: 'designation',   headerName: 'designation', width: 130 },
        { field: 'assignProject',   headerName: 'assignProject', width: 130 },
        { field: 'isAdmin',   headerName: 'UserType', width: 130,
        renderCell: (params) =>  
        {
            return(
                <div>
                     { params.row.isAdmin ? <Admin>admin</Admin> : params.row.isStaff ?   <Customer>staff</Customer> : <Staff>customer</Staff> } 
                </div>
                
            )
        }
     },
        {
            field: 'action',
            headerName: 'Action',
            type: 'string',
            width: 190,
            cellRenderer: (params) => {
                return (
                    <Actions>
                        <View onClick ={()=> navigate(`/user/${params.row.id}`)}>
                        View

                </View> 
                    </Actions>
                );
            },
        },

    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                  
            />
        </div>
    );
}
        




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

    const View=styled.button`
    background-color:green;
    color:green;
     
    border-radius:5px;
    `;

    const Admin=styled.div`

    background-color:green;
    color:white;
    border:none;
    border-radius:5px;
    `;
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
    const Customer=styled.div`

    background-color:red;
    color:white;
    border:none;
    border-radius:5px;
    `;































// import React from "react";
// import { useState } from "react";
// //import ReactDOM from "react-dom";
// import CRUDTable, {
//   Fields,
//   Field,
//   CreateForm,
//   UpdateForm,
//   DeleteForm
// } from "react-crud-table";
// //import Projects from "./staff";
// //import "../style.css";


// //const DescriptionRenderer = ({ field }) => <textarea {...field} />;
// let project = [
//   {
//     id: 1,
//      projectName:"",
//      projectHistory:"",  

//   }
// ];

// const SORTERS = {
//   NUMBER_ASCENDING: (mapper) => (a, b) => mapper(a) - mapper(b),
//   NUMBER_DESCENDING: (mapper) => (a, b) => mapper(b) - mapper(a),
//   STRING_ASCENDING: (mapper) => (a, b) => mapper(a).localeCompare(mapper(b)),
//   STRING_DESCENDING: (mapper) => (a, b) => mapper(b).localeCompare(mapper(a))
// };

// const getSorter = (data) => {
//   const mapper = (x) => x[data.field];
//   let sorter = SORTERS.STRING_ASCENDING(mapper);

//   if (data.field === "id") {
//     sorter =
//       data.direction === "descending"
//         ? SORTERS.NUMBER_ASCENDING(mapper)
//         : SORTERS.NUMBER_DESCENDING(mapper);
//   } else {
//     sorter =
//       data.direction === "descending"
//         ? SORTERS.STRING_ASCENDING(mapper)
//         : SORTERS.STRING_DESCENDING(mapper);
//   }

//   return sorter;
// };

// let count = project.length;
// const service = {
//   fetchItems: (payload) => {
//     let result = Array.from(project);
//     result = result.sort(getSorter(payload.sort));
//     return Promise.resolve(result);
//   },
//   create: (task) => {
//     count += 1;
//     project.push({
//       ...task,
//       id: count
//     });
//     return Promise.resolve(task);
//   },
//   update: (data) => {
//     const task = project.find((t) => t.id === data.id);
     
//     task.projectName  = data.projectName;
//     task.projectHistory  = data.projectHistory;

//     return Promise.resolve(task);
//   },
//   delete: (data) => {
//     const task = project.find((t) => t.id === data.id);
//     project = project.filter((t) => t.id !== task.id);
//     return Promise.resolve(task);
//   }
// };

// const styles = {
//   container: { margin: "auto", width: "fit-content" }
// };

//  const Projects = () => {
   
   
//   return (
//   <div style={styles.container}>

//     <CRUDTable
//       caption="Projects"
//       fetchItems={(payload) => service.fetchItems(payload)}
//     >
//       <Fields>
//         <Field name="id" label="Id" hideInCreateForm />
         

//         <Field
//           name="projectName"
//           label="Project Name"
//             placeholder="Project Name"
//         />
//         <Field name="projectHistory" label="Project History" />

         


//       </Fields>
//       <CreateForm
//         projectName="Projects Creation"
//         message=" a new Projects"
//         trigger=" Add Projects"
//         onSubmit={(task) => service.create(task)}
//         submitText="Add"
//         validate={(values) => {
//           const errors = {};
//           if (!values.projectName) {
//             errors.projectName = "Please, provide task's projectName";
//           }

//           if (!values.projectHistory) {
//             errors.projectHistory= "Please, provide task's  ";
//           }

//           return errors;
//         }}
//       />

//       <UpdateForm
//         projectName="  Update Projects"
//         message="Update Projects"
//         trigger="Update"
//         onSubmit={(task) => service.update(task)}
//         submitText="Update"
//         validate={(values) => {
//           const errors = {};

//           if (!values.id) {
//             errors.id = "Please, provide id";
//           }

//           if (!values.projectName) {
//             errors.projectName = "Please, provide task's projectName";
//           }
//           if(!values.projectHistory){
//             errors.projectHistory = "Please, provide task's  ";
//           }
        

//           return errors;
//         }}
//       />

//       <DeleteForm
//         projectName=" Delete Projects"
//         message="Are you sure you want to delete the Projects?"
//         trigger="Delete"
//         onSubmit={(task) => service.delete(task)}
//         submitText="Delete"
//         validate={(values) => {
//           const errors = {};
//           if (!values.id) {
//             errors.id = "Please, provide id";
//           }
//           return errors;
//         }}
//       />
//     </CRUDTable>
//   </div>
// );
//       }

 
// export default Projects;
