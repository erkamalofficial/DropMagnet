import React from "react";
import styled from "styled-components";

const IconWrap = styled.div`
  width: 46px;
  height: 46px;
  background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
  border: 0.75px solid #000000;
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
  
  &.light {
    // background-color: #EFEFEF;
    background-image: linear-gradient(rgba(239, 239, 239, 0.27), rgba(239, 239, 239, 0.27));
    border: 1px solid #D6D6D6;
    box-shadow: 0 2px 4px rgba(195, 195, 195, 0.5);
  }
    
  &.header-edit {
    background-image: linear-gradient(rgb(239, 239, 239, 0.83), rgb(239, 239, 239, 0.83));
    border: 1px solid rgb(214, 214, 214);
    width: 36px;
    height: 36px;
    
    img {
        max-width: 17px;
        max-height: 17px;
    }
  }
  
   &.header-edit-black {
    background-image: linear-gradient(rgb(24, 24, 24), rgba(19, 19, 19, 0.83));
    border: 0.75px solid #000;
    width: 36px;
    height: 36px;
    
    img {
        max-width: 17px;
        max-height: 17px;
    }
  }
  
  &.social-media {
        width: 62px;
        height: 42px;
        border-radius: 9px;
        
        img {
         width: 28px;
         height: 26px;
        } 
      }
      
   @media (max-width: 375px) {
      // margin: 0 2px;
   }
    
   @media (max-width: 350px) and (max-height: 650px) {
        width: 36px;
        height: 36px;
        
        img{
            width: 18px;
            height: 18px;
        }
    }
    @media (max-width: 650px) {  
      &.header-edit {
        width: 36px;
        height: 36px;
        
        img {
         width: 17px;
         height: 17px;   
        }
      }
    }
  
  &.modal-icons {
    width: 50px;
    height: 40px;
    border-radius: 7px;
  }
  
  .bitcoin {
    padding-left: 2px;
  }     
`

const CircleIcon = ({imgUrl, alt, className}) => {
    return (
        <IconWrap className={className}>
            <img src={imgUrl} alt={alt} className={className}/>
        </IconWrap>
    )
}

export default CircleIcon
