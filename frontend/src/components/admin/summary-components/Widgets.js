import styled from "styled-components";


const Widget =({data}) => {
    return (
        <StyledWidgets>
 <Icon color={data.color} bgcolor={data.bgColor}>
{data.icon}
 </Icon>
 <Text>
<h3>
    paragraph
</h3>
<p>{data.isMoney ?  "$" + data.digits?.toLocaleString() : 
data.digits?.toLocaleString()}</p>

 </Text>
 {
        data.percentage  ? <>  <Percentage isActive={false}>{Math.floor(data.percentage) + "%"}</Percentage> </> : <></>
 }

        </StyledWidgets>
    );
}
export default Widget;

const StyledWidgets = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: grey;

    `;
    const Icon = styled.div`
    margin-right: 3px;
    padding: 3px;
    border-radius: 50%;
    background-color: ${({ bgcolor }) =>  bgcolor};
    color: ${({color})  =>  color};
    font-size: 12px;
    `;
    const Text = styled.div`
    h3{
        font-weight: bold;

    }
    p{
        font-size: 12px;
    }
     color: #000;
    `;

    const Percentage = styled.div`
     
    margin-left: 10px;
    font-size: 12px;
    color:${({isPositive})  =>  isPositive ? "#00c853" : "#ff0000"};
    `;



