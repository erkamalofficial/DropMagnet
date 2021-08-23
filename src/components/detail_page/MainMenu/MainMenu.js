import React, { useState, useEffect } from "react";
import "./MainMenu.css";
import { Link, useHistory } from "react-router-dom";
import { LogoTitle, LogoTitleSection } from "../../elements/HeaderBar/LogoTitles";
import Avatar from "../../elements/Avatar/Avatar";
import { getInitials } from "../../../utils";
import FadeIn from 'react-fade-in';
import { useAuth } from "../../../contexts/FirebaseAuthContext";
import { Row } from "../../exploreGalleries/styled-components/Row";
import { Link as HeaderLink } from "../../exploreGalleries/styled-components/Link";

export default function MainMenu(props) {

  const { currentUser } = useAuth()
  const [open, setOpen] = useState(false);
  const [verified, setVerified] = useState(false)

  const checkIfVerified = async () => {
    const r = await currentUser.getIdTokenResult()
    const is_verified = r.claims["verified"]
    setVerified(is_verified)
  }

  const h = useHistory()
  let pageName = h.location.pathname.split('/')[1].toLowerCase()

  useEffect(() => {
    checkIfVerified()
  }, [])

  var menuList = [
    {
      title: verified ? "Create a Drop" : "Apply for Drop Swipe",
      link: verified ? "create_drop" : "home"
    },
    { title: "Settings", link: "/settings" },
    { title: "Subscription", link: "/subscription" },
    { title: "Get drop token", link: "/getToken" },
    { title: "About", link: "/about" },
    { title: "What's a drop?", link: "/aboutDrop" },
    { title: "Terms and Conditions", link: "/term" },
    { title: "Logout", link: "/logout" },
  ];

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  function closeMenu() {
    props.setOpen(false);
  }

  function renderMenuItem(item, index) {
    return (
      <Link
        className="main-menu-item"
        style={{ marginBottom: "16px" }}
        key={index}
        to={item.link}
      >
        {item.title}
      </Link>
    );
  }

  let menuClass = open ? "main-menu-open" : "main-menu-closed";

  return (
    <div className={menuClass}>
      <div className="main-header">
        <div className="left-header">
          <Link to={"/home"}
          style={{height: '36px', display: 'block'}}>
            <img
              alt={"logo"}
              style={{ width: 'auto', height: "36px" }}
              className="header-left-image clickable"
              src="./logo.svg"
            />
          </Link>
          <Row className="items-center">
            <HeaderLink to="/"
              style={{ textTransform: 'capitalize' }}>
              {pageName}
            </HeaderLink>
          </Row>
        </div>
        <div className="right-header">
          {/* <img
            onClick={() => closeMenu()}
            alt={"close-button"}
            className="close-button"
            src="./close-icon.png"
          /> */}
          {/* <Link to={"/profile"}>
            <div className="header-profile-img-holder" >
              <Avatar
                userImage={props.userImage}
                initial = {getInitials(props.userDetails.name)}
                view_only
                small
                style={{width: 40, height: 40}}
              />
            </div>
          </Link> */}
        </div>
      </div>

      <div className="main-menu-holder">
        {props.userDetails !== {} && props.userDetails !== undefined ? (
          <div className="main-menu-header">
            <p1 style={{ fontWeight: "bold" }}>{props.userDetails.name}</p1>
            <p2 style={{ paddingTop: "4px" }}>@{props.userDetails.username}</p2>
          </div>
        ) : (
          <></>
        )}
        {open && (
          <FadeIn delay={100} childClassName="menu-list-item">
            {menuList.map(renderMenuItem)}
          </FadeIn>
        )}
      </div>
    </div>
  );
}
