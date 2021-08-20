import styled from "styled-components";

export const DropDownBtn = styled.div`
  width: 36px;
  height: 36px;
  position: relative;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -1px 0 #002b40;
  // background-image: linear-gradient(180deg, #181818 0%, #131313 100%);
  background-color: black;
  border-radius: 100px;
  cursor: pointer;
  &:after{
    content: "";
    position: absolute;
    width: 20px;
    height: 3px;
    top:13px;
    left:0;
    right:0;
    margin: 0 auto;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    background-color: #ffffff;
  }
  &:before{
    content: "";
    position: absolute;
    width: 16px;
    height: 3px;
    bottom: 13px;
    left:0;
    right:0;
    margin: 0 auto;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    background-color: #ffffff;
  }
`