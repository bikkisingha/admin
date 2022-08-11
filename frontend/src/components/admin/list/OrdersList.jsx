import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useSelector} from "react-redux";
 import { useEffect } from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
 import { useNavigate } from 'react-router';
 //import { productsDelete } from '../../../slices/productsSlice';
import { ordersEdit, ordersFetch } from '../../../slices/ordersSlice';
//import EditProduct from '../EditProduct';
  
export default function OrdersList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list } =useSelector(state => state.orders);
    console.log(list);
    useEffect(()=>{
        dispatch(ordersFetch());
    }
    ,[dispatch]);

    const rows=list?.map(order=>{
        return {
            id:order._id,
            name:order.name,
            amount:(order.total /100)?.toLocaleString(),
            dStatus:order.delivery_status,
            customer_details:order.customer_details,
            payment_status:order.payment_status,
            quantity:order.quantity,
            
        }})


        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'name', width: 80, },
            {field : 'quantity', headerName: 'Quantity', width: 80, },
          
             
            {
              field: 'dStatus',
              headerName: 'Status',
              type: 'string',
              width: 90,
              renderCell:(params) =>{
                return <div>
                {params.row.dStatus==='pending' ? <Pending>pending</Pending> : 
                params.row.dStatus==='dispatched' ? <Dispatched>dispatched</Dispatched> :
                params.row.dStatus==='delivered' ? <Delivered>delivered</Delivered>: "error"}
                </div>;
            },
            },
            {
                field: 'amount',
                headerName: 'Amount($)',
                type: 'number',
                width: 90,
              },
              {
                field: 'customer_details',
                headerName: 'customer details',
                type: 'string',
                width: 90,
              },
            {
              field: 'actions',
              headerName: 'Actions',
              
              sortable: false,
              width: 300,
              renderCell:(params) =>{
                return(
                     
               <Actions >
                 

                
                    
   
<DispathchBtn onClick = {()=> handleOrderDispatch(params.row.id)} >
    Dispatch
</DispathchBtn>
            <DeliveryBtn onClick = {()=> handleOrderDeliver(params.row.id)} >
    Delivery
            </DeliveryBtn>
            <PendingBtn onClick = {()=> handleOrderPending(params.row.id)} >
    Pending
            </PendingBtn>
            
             
        <View  onClick = {() => navigate(`/order/${params.row.id}`)}>
                    View
    </View>
     
         </Actions>
                     
                ); },
               
            },];

 
        //      const handleEdit = (id) => {
        //         navigate(`/product/${id}/edit`);
        //         }
          
        const handleOrderDispatch = (id) => {
            dispatch(ordersEdit({
                id,
                
                delivery_status:"dispatched"
                }));
        }
        const handleOrderDeliver = (id) => {
            dispatch(ordersEdit({
                id,
                
                delivery_status:"delivered"
                }));
        }
        const handleOrderPending = (id) => {
            dispatch(ordersEdit({
                id,
                delivery_status:"pending"
                }));
        }


  return (
    <div style={{ height: 400, width: '100%',columnGap:100  }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
         spaceBetween={50}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}


const Pending = styled.div`
//color:red;
background-color:red;
padding:5px;
border-radius:5px;
font-size:12px;
`;

const Dispatched = styled.div`
//color:yellow;
background-color:yellow;
padding:5px;
border-radius:5px;
font-size:12px;
`;
const Delivered = styled.div`
//color:green;
background-color:green;
padding:5px;
border-radius:5px;
font-size:12px;
`;



 const DispathchBtn = styled.button`
    background-color: maroon;
    border: none;
    padding: 5px;
    margin: 5px;
    color: white;
    `;
const DeliveryBtn = styled.button`

    background-color: #4CAF50;
    padding: 5px;
    border: none;
    color: white;
    `;
const PendingBtn = styled.button`
    background-color: #f44336;
    padding: 5px;
    border: none;
    color: white;
    `;


const Actions = styled.div`

   

 justify-content: space-between;
 align-list:center;
 width:10px;
  
  
 button{
     margin:5px;
     border-radius:5px;
     height:30px;
     cursor:pointer;
 }
`;
  
 const View=styled.button`
 background-color:green;
 color:white;
 border:none;
 border-radius:5px;
 `;



