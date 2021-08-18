import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const Link = styled(NavLink)`
  box-shadow: 0 0 2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 -1px 3px rgba(0, 0, 0, 0.5), inset 0 -3px 0 rgba(37, 37, 37, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 100px;
  background-image: linear-gradient(180deg, rgba(24, 24, 24, 0.83) 0%, rgba(19, 19, 19, 0.83) 100%);
  color: #d8d8d8;
  font-family: "Quicksand";
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  cursor: pointer;
  padding: 6px 12px 10px;
  text-decoration: none;
  margin: 0 14px;
  position: relative;
  overflow: hidden;
  display:block;
  min-width:fit-content;
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
  }
`