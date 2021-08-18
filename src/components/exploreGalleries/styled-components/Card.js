import React from 'react'
import styled from "styled-components";
import circle from "../assets/circle.svg";


const CardWrapper = styled.div`
    cursor:pointer;
    border: solid black;
    border-width: 0 1px 1px 0;
    @media(max-width: 374px) {
        padding: 0 7px;
      }
`;
const CardContent = styled.div`
    // margin-top: 23px;
    position:relative;
    width: 100%;
      // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -4px 0 #161616;
      // border-radius: 10px;
      // background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);
      // padding-bottom: 17px;
      // padding-top: 32px;
      @media(max-width: 374px) {
        // height: 88px;
        // padding-top: 20px;
        // padding-bottom: 13px;
        display: flex;
        flex-direction: column;
        align-items: center
      }
`;
const CardIcon = styled.div`
    // width: 47px;
  // height: 46px;
  // border-radius: 100px;
  // box-shadow: 0 3px 4px #191919, inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 2px 5px rgba(0, 0, 0, 0.5);
  // background-image: url(${circle});
  // background-position: center;
  // overflow:hidden;
  // position: absolute;
  // top: -23px;
  // left: 0;
  // right: 0;
  // margin: 0 auto;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  padding-top: 18px;
  text-align: center;
  img{
   width: 24px;
   height: 24px;
   object-fit: scale-down;
  }
  @media(max-width: 374px) {
   width: 39px;
  height: 39px;
  top: -19.5px;
  }
`;
const CardTitle = styled.p`
    color: #eaeaea;
    font-size: 18px;
      margin-top: 8px;
      text-align:center;
  `;
// const CardSubtitle = styled.p`
// text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
//   color: #eaeaea;
//   font-size: 24px;
//   font-weight: 500;
//   font-style: normal;
//   letter-spacing: normal;
//   line-height: normal;
//   text-align: center;
//   margin: 0;
// `



const Card = ({title,subtitle, img}) => {
    return (
        <CardWrapper>
            <CardContent>
                <CardIcon>
                    <img src={img} alt=""/>
                </CardIcon>
                <CardTitle>{title}</CardTitle>
                {/*<CardSubtitle>{subtitle}</CardSubtitle>*/}
            </CardContent>
        </CardWrapper>
    )
}

export default Card