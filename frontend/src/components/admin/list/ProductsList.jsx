 
    import * as React from 'react';
    import { DataGrid } from '@mui/x-data-grid';
    import {useSelector} from "react-redux";
    import styled from 'styled-components';
    import {useDispatch} from "react-redux";
     import { useNavigate } from 'react-router';
import { productsDelete } from '../../../slices/productsSlice';
import EditProduct from '../EditProduct';
      
    export default function ProductList() {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const {items} =useSelector(state => state.products);
        const rows=items?.map(item=>{
            return {
                id:item._id,
                imageUrl:item.image.url,
                name:item.name,
                price:item.price.toLocaleString(),
                description:item.description,
                stock:item.stock.toLocaleString(),

                //projectCategory:item.category,
               // MRP :item.MRP.toLocaleString(),

            }})

            const columns = [
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'imageUrl', headerName: 'image', width: 70, 
              renderCell:(params) =>{
                  return(
                      <ImageContainer>
                            <img src={params.row.imageUrl} alt=""/>

                      </ImageContainer>
                  )
              }},
                { field: 'price',  type: 'number', headerName: 'Price', width: 130 },
                {
                  field: 'name',
                  headerName: 'Name',
                  type: 'string',
                  width: 90,
                },
                {
                    field: 'description',
                    headerName: 'Description',
                    type: 'string',
                    width: 90,
                  },
                  {
                    field: 'stock',
                    headerName: 'Stock',
                    type: 'number',
                    width: 90,
                    //updated stock value
                    renderCell:(params) =>{
                        return(
                            <Stock> {params.row.stock  }</Stock>
                        )
                    }
                  },
                     
                     

                    // renderCell:(params) =>{
                    //     return <div>
                    //     {params.row.stock===0 ?    "out of stock"   : 
                    //     params.row.stock>0 ?  "In Stock"  : "error"}
                    //     </div>;
                    // }

                  
                  // {
                  //   field: 'projectCategory',
                  //   headerName: 'Category',
                  //   type: 'string',
                  //   width: 90,
                  // },
                  // {
                  //   field: 'MRP',
                  //   headerName: 'MRP',
                  //   type: 'number',
                  //   width: 90,
                  // },
                {
                  field: 'actions',
                  headerName: 'Actions',
                  
                  sortable: false,
                  width: 160,
                  renderCell:(params) =>{
                    return(
                    <Actions>

                <Delete  onClick = {()=> handleDelete(params.row.id)} >
               Delete
                </Delete >
                 <EditProduct prodId={params.row.id}/>
                
                <View  onClick = {() => navigate(`/product/${params.row.id}`)}>
                        View

                </View>
            </Actions>
                         
                    ); },
                   
                },];


              const handleDelete = (id) => {
                dispatch(productsDelete(id));
                console.log("delete");
        
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
    
    const Stock = styled.div`
    color:red;
    font-size:20px;
    font-weight:bold;
    `;


    const ImageContainer = styled.div`
    img{
        height:50px;
    }
`;
const Actions = styled.div`

    display:flex;
    justify-content:space-between;
    align-items:center;
    width:400%;
     
    button{
        margin:0 0px;
        padding:1px 1px;
        cursor:pointer;
    }
`;
const Delete = styled.button`

    background-color:red;
    color:white;
    border:none;
    margin:10px;
    border-radius:5px;
    `;
    const View=styled.button`
    background-color:green;
    color:white;
    border:none;
    border-radius:5px;
    `;


 
