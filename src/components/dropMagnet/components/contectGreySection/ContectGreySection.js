import React from "react";
import styled from "styled-components";

const Element = styled.div`
    font-size: 18px;
    max-width: 100%;
    width: 100%;
    max-height: 42px;
    color: #fff;
    text-align: center;
    background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
    border: 0.75px solid #000000;
    padding: 10px 8px;
    text-align: center;
    border-radius: 9px;
    font-family: Azo Sans;
    font-size: 18px;
    font-weight: 400;
    margin: 0 auto;
    margin-bottom: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

       
    .nft {
      font-style: italic;
      font-weight: 600;
    }
    
    &.light {
      background-image: linear-gradient(rgb(247, 247, 247), rgb(247, 247, 247));
      border: 1px solid #D6D6D6;
      box-shadow: 0 2px 4px rgba(195, 195, 195, 0.5);
      color: #000000;
    }
`;

const ContectGreySection = ({content, styles}) => {
    return(
      <Element className={styles}>
          {content}
      </Element>
    )
}

export default ContectGreySection;