import React from "react";
import logo from "../../assets/drop_logo.svg"
import {Row} from "../../../exploreGalleries/styled-components/Row";
import {Link} from "../../styled-component/navLink";
import TextField from "../../styled-component/textField";
import styled from "styled-components";
import userImg from "../../../exploreGalleries/assets/user.svg";

const DropDownBtn = styled.button`
  width: 36px;
  height: 36px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -1px 0 #002b40;
  background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);
  border-radius: 100px;
  cursor: pointer;
  border: none;
  outline: none;
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
  @media(max-width: 500px){
    display: none;
    }
`;
const UserLogo = styled.div`
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
  @media(max-width: 500px){
    display: none;
  }
`;
const Nav = styled.div`
  background: #1a1a1a;
`

const Navbar = ({path, text}) => {
    return (
        <Nav className="navbar">
            <Row className="justify-between">
                <Row className="items-center">
                    <img src={logo} alt="logo"/>
                    <Link to={path}>
                        {text}
                    </Link>
                    <Link to={path} className="points">
                        ...
                    </Link>
                    <TextField type="search" placeholder="Search"/>
                </Row>
                <Row className="items-center">
                    <DropDownBtn/>
                    <UserLogo/>
                </Row>
            </Row>
        </Nav>
    )
}

export default Navbar