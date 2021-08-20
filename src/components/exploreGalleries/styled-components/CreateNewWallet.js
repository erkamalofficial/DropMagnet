import styled from "styled-components";
import circle from "../assets/circle.svg";
import pin from "../assets/pin.svg"
import {NavLink} from "react-router-dom";
import React from "react";

export const ButtonWrapper = styled.button`
  width:100%;
  margin: 0 auto;
  height: 106px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -4px 0 #161616;
  border-radius: 10px;
  background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  color: #eaeaea;
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  padding-left:65px;
  padding-right:25px;
  position:relative;
  @media(max-width: 374px) {
    padding-left: 50px;
    padding-right:10px
  }
`;
const CardIcon = styled.div`
  width: 47px;
  height: 46px;
  border-radius: 100px;
  box-shadow: 0 3px 4px #191919, inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 2px 5px rgba(0, 0, 0, 0.5);
  background-image: url(${circle});
  background-position: center;
  overflow:hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  @media(max-width: 374px) {
    width: 35px;
    height: 35px;
    left: 8px;
    img{
      margin-top: 5px;
      width: 19px
    }
  }
`;
const ButtonText = styled.p`
  margin-top: 0;
  margin-bottom: 0;
  text-align:left;
`;


const NavBtn = styled(NavLink)`
   text-decoration: none;
`
const CreateNewWallet = ({text, pathTo}) => {
    return (
        <NavBtn to={pathTo}>
            <ButtonWrapper>
                <CardIcon>
                    <img src={pin} alt="icon"/>
                </CardIcon>
                <ButtonText>{text}</ButtonText>
            </ButtonWrapper>
        </NavBtn>
    )
}

export default CreateNewWallet