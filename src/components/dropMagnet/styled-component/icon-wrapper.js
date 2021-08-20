import React from "react";
import styled from "styled-components";

const IconWrap = styled.div`
  width: 52px;
  height: 52px;
  padding-bottom:3px;
  box-shadow: 0 0 2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 -1px 3px rgba(0, 0, 0, 0.5), inset 0 -3px 0 rgba(37, 37, 37, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.5);
  background-image: linear-gradient(180deg, rgba(24, 24, 24, 0.83) 0%, rgba(19, 19, 19, 0.83) 100%);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img{
      width: 22px;
      height:22px;
      object-fit: contain;
      &.heart-image{
        width: 100%;
        height: 100%;
      }
  }
`;

const CircleIcon = ({imgUrl, alt, className}) => {
    return (
        <IconWrap>
            <img src={imgUrl} alt={alt} className={className}/>
        </IconWrap>
    )
}

export default CircleIcon
