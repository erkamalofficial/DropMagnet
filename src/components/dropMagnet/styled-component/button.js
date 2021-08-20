import React from "react";
import styled from "styled-components";

const Button = styled.button`
  min-width: 164px;
  min-height: 46px; 
  box-shadow: 0 0 2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 -1px 3px rgba(0, 0, 0, 0.5), inset 0 -3px 0 rgba(37, 37, 37, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 100px;
  border: 1px solid;
  background-color: transparent;
  background-image: linear-gradient(180deg, rgba(24, 24, 24, 0.83) 0%, rgba(19, 19, 19, 0.83) 100%);
  cursor: pointer;
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  margin: 8px;
  position:relative;
  overflow: hidden;
  cursor:pointer;
  &:after{
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    z-index: 1;
    box-shadow: 0 7px 8px rgba(0, 0, 0, 0.5);
    opacity: 0.81;
    border-radius: 100px;
  }
  @media(max-width: 500px){
  font-size: 16px;
  min-height: 36px;
  }
  @media(max-width: 380px){
    margin: 5px;
    min-width:144px;
  }
  @media(max-width: 330px){
    margin: 5px;
    min-width:134px;
  }
  @media(max-width: 390px){
  width: 40%;
  }
`;


const StyledButton = (props) => {
    return (
        <Button style={{borderColor: `${props.borderColor}`}}>
            {props.children}
        </Button>
    )
}

export default StyledButton