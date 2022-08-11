import styled from 'styled-components';
export const StyledForm = styled.form` 
 max-width: 350px;
 width: 100%;
    margin: 2rem auto;
    h1{
        margin-bottom: 2rem;

    }
    input, button{
        width: 100%;
        padding: 7px;
        outline: none;
        height: 40px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 10px;
        &:focus{
            border: 1px solid #ccc;

    }
    }
    button{
        background-color: #ccc;
        cursor: pointer;
        &:hover{
            background-color: #ccc;
        }
    }
    p{
        color: red;
        font-size: 1.2rem;
    }
    

    `;

