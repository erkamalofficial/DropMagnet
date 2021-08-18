import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const Link = styled(NavLink)`
  // box-shadow: 0 0 2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 -1px 3px rgba(0, 0, 0, 0.5), inset 0 -3px 0 rgba(37, 37, 37, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 19px;
  background-color: black;
  line-height: 20px;
  vertical-align: bottom;
  // background-image: linear-gradient(180deg, rgba(24, 24, 24, 0.83) 0%, rgba(19, 19, 19, 0.83) 100%);
  color: #d8d8d8;
  font-size: 16px;
  text-decoration: none;
  padding: 8px 12px;
`