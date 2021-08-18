import styled from "styled-components";
import userImg from "../assets/user.svg"

export const UserLogo = styled.div`
  width: 36px;
  height: 36px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -1px 0 #002b40;
  background-image: url(${userImg});
  border-radius: 100px;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-size: inherit;
  margin-left: 16px;
  @media(max-width: 374px){
    display: none;
  }
`