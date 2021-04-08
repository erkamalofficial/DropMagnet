import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom'
import "./HeaderBar.css"

export default function HeaderBar(props) {

  function showUserAction() {
    if (props.userLoggedIn)
    {
      return <Link to={'/profile'}>
              <div className="header-profile-img-holder">
                <img className="header-right-image" src={props.userImage}/>
              </div>
            </Link> 
    } else {
      return <Link to={'/login'}>
              <button className="login-button">Log in</button>
            </Link>
    }
  }

  return (
    <div className="header-container">
      <img onClick={() => props.openHome()} className="header-left-image" src="./dropmagnet-small-logo.png" />
      { props.datePickerVisible ? 
        <div onClick={() => props.openDateMenu()} className="dropdown-button">
          <p1 className="dropdown-button-title">{props.selectedDropdownDate}</p1>
          <img style={{objectFit: 'cover'}} className="dropdown-button-icon" src="./dropdown.png"/>
        </div>
        :
        <></>
      }
      <div className="header-right-holder">
        <div onClick={() => props.openMenu()} className="header-bar-menu-icon">
          <img height={10} width={20} style={{margin: 'auto'}} src="./menu-bars-icon.png" />
        </div>
        {props.userImageVisible ? 
          showUserAction()
        :
        <></> 
        }
        
      </div>
    </div>

  );
}