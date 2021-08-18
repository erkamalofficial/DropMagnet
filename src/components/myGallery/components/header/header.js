import React from "react";
import {Row} from "../../../exploreGalleries/styled-components/Row";
import logo from "../../../dropMagnet/assets/drop_logo.svg";
import {Link} from "../../styled-components/Link";
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
`;
const Navbar = styled.nav`
    padding: 16px 16px 23px 6px;
`;


const Header = () => {
    return (
        <Navbar>
            <Row className="justify-between">
                <Row className="items-center">
                    <img src={logo} alt="logo"/>
                    <Link to="my-gallery">
                        My Galleries
                    </Link>
                </Row>
                <Row className="items-center">
                    <DropDownBtn/>
                    <UserLogo/>
                </Row>
            </Row>
        </Navbar>
    )
}

export default Header