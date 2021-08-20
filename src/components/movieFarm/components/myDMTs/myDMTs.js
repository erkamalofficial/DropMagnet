import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const Dmt = styled.div`
 text-align: center;
`;

const Title = styled.h1`
 margin: 0;
 padding: 0;
 font-size: 18px;
 font-weight: 500;
 text-decoration: underline;
 margin-top: 22px;
 margin-bottom: 133px;
`;

const Description = styled.p`
  padding-bottom: 16px; 
  font-weight: 500;
  font-size: 18px;
  
  a {
   font-weight: 500;
   font-size: 18px;
   color: #000;
  }
`;

const MyDmt = () => {
    return(
      <Dmt>
          <Title>My DMTs</Title>
          <Description>
              You currently don’t have any DMTs in your connected wallet.
          </Description>
          <Description>
              Please connect another wallet or buy a DMT <NavLink to='#'>here</NavLink>.
          </Description>
      </Dmt>
    )
}

export default MyDmt;