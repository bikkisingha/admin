import {NavLink, Outlet } from "react-router-dom";
 import styled from "styled-components";
import {useSelector} from "react-redux";
import {FaUser} from 'react-icons/fa';
import {FaAudible} from 'react-icons/fa';
 import {FaChrome, FaTachometer} from 'react-icons/fa';
 import { applyInitialState } from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";

 const Dashboard = () => {
     
    const auth = useSelector(state => state.auth);
    if(auth.isAdmin  )
     { 
        return ( <> 
         
         <StyledDashboard>
            <SideNav>
                <h2> Quick Links</h2>
                <NavLink className={(isActive) => isActive ? "link-active" : "inactive" } to="/admin/summary"  >
                <FaAudible /> Summery
                </NavLink>
                <NavLink className={(isActive) => isActive ? "link-active" : "inactive" } to="/admin/projects"  >
                <FaChrome />  Projects
                </NavLink>
                <NavLink className={(isActive) => isActive ? "link-active" : "inactive" } to="/admin/designation"  >
                <FaChrome />   Designation
                </NavLink>
                <NavLink  className={(isActive)=>isActive ? "link-active" :" inactive" } to="/admin/products"  >
                    <FaAudible /> Products
                </NavLink>
                <NavLink  className={(isActive)=>isActive ? "link-active" :" inactive" } to="/admin/orders"  >
                <FaChrome />     Orders
                </NavLink>
                <NavLink  className={(isActive)=>isActive ? "link-active" :" inactive" } to="/admin/users"  >
                 <FaChrome />       Users
                </NavLink>
            </SideNav>
            <Content>
                <Outlet />
            </Content>

         </StyledDashboard>
          
            </>
        );
    }
     else if (auth.isStaff)
    {
        return (
            <StyledDashboard>
                <SideNav>
                    <h2> Quick Links</h2>
                    <NavLink className={(isActive) => isActive ? "link-active" : "inactive" } to="/admin/summary"  >
                    <FaAudible /> Summery
                    </NavLink>
                    <NavLink className={(isActive) => isActive ? "link-active" : "inactive" } to="/admin/projects"  >
                    <FaChrome />  Projects
                    </NavLink>
                    <NavLink className={(isActive) => isActive ? "link-active" : "inactive" } to="/admin/designation"  >
                    <FaChrome />   Designation
                    </NavLink>
                    <NavLink  className={(isActive)=>isActive ? "link-active" :" inactive" } to="/admin/products"  >
                        <FaAudible /> Products
                    </NavLink>
                    <NavLink  className={(isActive)=>isActive ? "link-active" :" inactive" } to="/admin/orders"  >
                    <FaChrome />     Orders
                    </NavLink>
                    <NavLink  className={(isActive)=>isActive ? "link-active" :" inactive" } to="/admin/users"  >
                     <FaChrome />       Users
                    </NavLink>
                </SideNav>
                <Content>
                    <Outlet />
                </Content>
    
             </StyledDashboard>
    
        ) ;
    }

    else {
    
    return (
        <StyledDashboard>
            <SideNav>
                <h2> Quick Links</h2>
                <NavLink className={(isActive) => isActive ? "link-active" : "inactive" } to="/admin/summary"  >
                <FaAudible /> Summery
                </NavLink>
                
                 
                <NavLink  className={(isActive)=>isActive ? "link-active" :" inactive" } to="/admin/products"  >
                    <FaAudible /> Products
                </NavLink>
                <NavLink  className={(isActive)=>isActive ? "link-active" :" inactive" } to="/admin/orders"  >
                <FaChrome />     Orders
                </NavLink>
                 
            </SideNav>
            <Content>
                <Outlet />
            </Content>

         </StyledDashboard>

    );
   
     
    }
    }
export default Dashboard;

const StyledDashboard = styled.div`
    display: flex;
    height: 100vh;
    `;
const SideNav = styled.div`
    width: 200px;
    background-color: #f5f5f5;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    position: fixed;
    a{
        text-decoration: none;
        color: #333;
        display: block;
    }
    `;

    const Content = styled.div`
    margin-left: 200px;
    padding: 20px;
    width: 100%;
    `;