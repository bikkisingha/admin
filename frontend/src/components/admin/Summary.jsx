 import styled from 'styled-components';
import {FaUser} from 'react-icons/fa';
 import {FaAudible} from 'react-icons/fa';
import {FaChrome} from 'react-icons/fa';
import Widget from './summary-components/Widgets';
 import {useState, useEffect} from 'react';
 import axios from 'axios';
 import {url, setHeaders} from "../../slices/api";

 
 const Summary = () => {
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    console.log(orders);

    useEffect(() => {
        async function fetchData() {
            try{
              const res=axios.get(`${url}/users`,setHeaders()); 
                setUsers(res.data);

            }
            catch(err){
                console.log(err);
            }


            
        }
        fetchData();
    }
    , []);
    useEffect(() => {
        async function fetchData() {
            try{
              const res=axios.get(`${url}/orders`,setHeaders()); 
                setOrders(res.data);

            }
            catch(err){
                console.log(err);
            }
            
        }
        fetchData();
    }
    , []);

    const data = [
        {
            icon: <FaUser />,
            title: 'Total Users',
             color: '#6c5ce7',
             bgColor: '#f5f5f5',
             digits: 80,
            percentage: 10
        },
        {
            icon: <FaAudible />,
            title: 'Total Sales',
            color: '#00c853',
            digits: 50,
            isMoney: true,
            bgColor: '#f5f5f5',
            percentage: 10
        },
        {
            icon: <FaChrome />,
            title: 'Total Products',
            color: '#ff9800',
            digits: 50,
            bgColor: '#f5f5f5',
            percentage: '10'
        }
    ];

       



    return (
         <SummeryContainer>
<MainStats>
    <Overview>
      <Title>
        Overview

        </Title> 
      <WidgetWrapper>
        {data?.map((data, index) => (
            <Widget key={index} data={data} />
        ))}


        </WidgetWrapper> 
    </Overview>
</MainStats>
<SideStats></SideStats>
         </SummeryContainer>
    );
    }
export default Summary;
const SummeryContainer = styled.div`

    display: flex;
    flex:2;
    `;
    const MainStats = styled.div`
    display: flex;
    flex:2;
    `;
    const SideStats = styled.div`
    display: flex;
    flex:1;
    flex-direction: column;
    margin-left: 10px;
    width: 100%;
    `;

    const Overview = styled.div`
    display: flex;
    flex:1;
    flex-direction: column;
    margin-left: 10px;
    width: 100%;
    `;
    const Title = styled.div`
    display: flex;
    flex:1;
    flex-direction: column;
    margin-left: 10px;
    width: 100%;
    `;
    const WidgetWrapper = styled.div`
    display: flex;
    flex:1;
    flex-direction: column;
    margin-left: 10px;
    width: 100%;
    `;

 