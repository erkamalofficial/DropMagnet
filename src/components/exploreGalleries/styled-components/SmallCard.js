import styled from "styled-components";
import React from "react";

const Card = styled.div`
  width: 106px;
  height: 69px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -4px 0 #161616;
  border-radius: 10px;
  background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);
  position: relative;
  display:flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
    cursor: pointer;
  &:last-child{
    margin-top: 59px;
  }
`;

const CardIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100px;
  box-shadow: 0 3px 4px #191919, inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 2px 5px rgba(0, 0, 0, 0.5);
  background-color: #141414;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -24px;
  display:flex;
  align-items: center;
  justify-content: center;
`;

const CardDescription = styled.p`
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  color: #eaeaea;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  margin: 0;
  text-transform: capitalize;
`

const SmallCard = ({image, text}) => {
    return (
        <Card>
            <CardIcon>
                <img src={image} alt="icon"/>
            </CardIcon>
            <CardDescription>{text}</CardDescription>
        </Card>
    )
}

export default SmallCard