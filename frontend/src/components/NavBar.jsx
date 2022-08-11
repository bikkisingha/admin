import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {toast} from 'react-toastify'
 
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>E-commerce</h2>
      </Link>
      <Link to="/cart">
        <div className="nav-bag">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-handbag-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
          </svg>
          <span className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>
{
  auth._id ? 
<Links>
{
  auth.isAdmin ? 

 
  <Adm>
    <Link to="/admin/summary"> Dashboard
    </Link>
    <Link to="/register">Register</Link>
  </Adm> 
  : 
    
  (auth.isStaff) ?
  <Adm>
    <Link to="/admin/summary"> Dashboard
    </Link>
    <Link to="/register">Register</Link>
  </Adm> 
    : null }
  
  <Logout onClick ={()=> {
    dispatch(logoutUser(null))
    toast.success("Logged out successfully")
  }} >
    logout
  </Logout  >
</Links>
     :
    <AuthLink>
    <Link to="/login">login</Link>
     
    <Link to="/admin/orders">
      orders
    </Link>
     

  </AuthLink>

}
    </nav>
  );
};
const AuthLink = styled.div`
a{
  &:last-child{
    margin-left: 10px;  
}
}
`;
const Adm= styled.div`
a{
   

  &:first-child{
    margin: 30px;
  }
  &:last-child{
    margin: 30px;
  }
}
`;


export default NavBar;
const Logout= styled.div`
  display: flex;
  cursor: pointer;
  color: #fff;
  padding -left: 10px;
  font-size: 1.2rem;
  `;
const Links = styled.div`
   display: flex;
  color: #fff;
  space-between: 10px;
  Logout{
    cursor: pointer;
    &:last-child{
      margin-left: 10px;
    }
  
  &:child{
    margin-right: 10px;
    margin-left: 10px;

  }
}
  `;
