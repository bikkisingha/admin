 import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeader, PrimaryButton } from "./CommonStyled";
const Products = () => {
    const navigate = useNavigate();

    return (
        <> 
        <AdminHeader>
            <h1>Products</h1>
            <PrimaryButton onClick={()=>navigate("/admin/products/add-product")}  >Create Product</PrimaryButton>
             <Outlet />
        </AdminHeader>
        </>
    );
}
export default Products;
