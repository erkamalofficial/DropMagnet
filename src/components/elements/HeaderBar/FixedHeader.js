import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom'

// import HeaderBar from '../../components/elements/HeaderBar/HeaderBar2'
// import CategoryMenu from '../../components/elements/CategoryMenu/CategoryMenu'
import "./HeaderBar.css"

const FixedHeader = (props) => {


    function showUserAction() {
        if (props.userLoggedIn) {
            return <Link to={'/profile'}>
                <div className="header-profile-img-holder JJJJ">
                    <img className="header-right-image" src={props.userDetails.image} />
                </div>
            </Link>
        } else {
            return <Link to={'/login'}>
                <button className="login-button">Log in</button>
            </Link>
        }
    }
    return (
        <div className="fixed-container">


            <div className="header-container">
                <div className="header-left-holder">
                    <img className="header-left-image" src="./dropmagnet-small-logo.png" />
                    {props.isMagGallery && <div className="dropdown-button-title"> Mag.Link/TIME </div>}
                </div>
                <div className="header-right-holder">
                    <div className="header-bar-menu-icon">
                        <img height={10} width={20} style={{ margin: 'auto' }} src="./menu-bars-icon.png" />
                    </div>
                    {showUserAction()}
                </div>
            </div>
        </div>
    )
};

export default FixedHeader;