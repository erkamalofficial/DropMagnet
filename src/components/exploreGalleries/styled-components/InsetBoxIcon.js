import styled from "styled-components";

export const InsetBoxIcon = styled.div`
    width:46px;
    height:46px;
    display: flex;
    align-items: center;
    justify-content: center;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -1px 0 #002b40;
    background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19, 19, 19, 0.83) 100%);
    border-radius: 100px;
    border: 1px solid black;
    position: relative;
    cursor:pointer;
    img{
        width: auto;
        height: 23px;
    }
    p.left-top-tooltip{
      position: absolute;
      margin: 0;
      top: -8px;
      left: -8px;
      width: 25px;
      height: 24px;
      border-radius: 50px;
      background-color: #0376ff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 500;
      font-style: normal;
      letter-spacing: normal;
      line-height: normal;
      text-align: center;
      color: #ffffff;
    }
    p.right-top-tooltip{
    position: absolute;
      margin: 0;
      top: -8px;
      right: -8px;
      width: 25px;
      height: 24px;
      border-radius: 50px;
      background-color: #5d20a8;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 500;
      font-style: normal;
      letter-spacing: normal;
      line-height: normal;
      text-align: center;
      color: #ffffff;
    }
    @media(max-width: 374px){
      width: 44px;
      height:44px;
    }
  
`