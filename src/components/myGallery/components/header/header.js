import React, { useState } from "react";
import { Row } from "../../../exploreGalleries/styled-components/Row";
import logo from "../../../dropMagnet/assets/drop_logo.svg";
import { Link as HeaderLink } from "../../styled-components/Link";
import styled from "styled-components";
import userImg from "../../../exploreGalleries/assets/user.svg";
import { useHistory } from "react-router-dom";
import { getInitials } from "../../../../utils";
import Avatar from "../../../elements/Avatar/Avatar";
import { Link } from "react-router-dom";
import MainMenu from "../../../detail_page/MainMenu/MainMenu";
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
    padding: 16px;
`;


const Header = () => {

  const [mainMenuOpen, setMainMenuOpen] = useState(false)

  const history = useHistory()
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  function showUserAction() {
    if (userDetails) {
      return <Link to={'/profile'} style={{ zIndex: 999999999999, textDecoration: 'none' }}>
        <div className="header-profile-img-holder">
          <Avatar userImage={userDetails.avatar_url}
            initial={getInitials(userDetails.name)}
            view_only
            small />
        </div>
      </Link>
    } else {
      return null
    }
  }

  return (
    <>
      {userDetails && <MainMenu
        userDetails={userDetails}
        userImage={userDetails.avatar_url}
        open={mainMenuOpen}
        setOpen={setMainMenuOpen}
      />}
      <Navbar>
        <Row className="justify-between">
          <Row className="items-center">
            <img className="header-left-image clickable"
              alt="/"
              src="./logo.svg"
              style={{ height: '36px', width: 'auto' }}
              onClick={() => {
                if (history.location.pathname === '/home') {
                  history.push('/');
                } else {
                  history.push('/home');
                  sessionStorage.removeItem('headerLoad')
                }
              }}
            />
            <HeaderLink to="/">
              Home
            </HeaderLink>
          </Row>
          <Row className="items-center">
            {showUserAction()}
            <div onClick={() => setMainMenuOpen(!mainMenuOpen)} className="nav-bar-menu-icon"
              style={{ zIndex: 999999999999 }}>
              <div class={`menu-icon ${mainMenuOpen ? 'close-icon' : ''}`}>
                <div class="leftright"></div>
                <div class="rightleft"></div>
              </div>

            </div>
          </Row>
        </Row>
      </Navbar>
    </>
  )
}

export default Header