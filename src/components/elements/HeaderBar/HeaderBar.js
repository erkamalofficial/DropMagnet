import React, { useState, useEffect } from 'react';
import { Link, Redirect, useHistory, withRouter } from 'react-router-dom'
import "./HeaderBar.css"
import { epochToDayMonth } from '../../../helpers/DateFormatter';
import MainMenu from '../../detail_page/MainMenu/MainMenu'


function HeaderBar(props) {
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  function showUserAction() {
    if (props.userLoggedIn)
    {
      return <Link to={'/profile'}>
              <div className="header-profile-img-holder">
                <img className="header-right-image" src={userDetails.avatar_url || './add-user-icon.png'}/>
              </div>
            </Link> 
    } else {
      return <Link to={'/login'}>
              <button className="login-button">Log in</button>
            </Link>
    }
  }

  function openMenu() {
    setMainMenuOpen(true)
  }

  function openItem(e) {
    console.log(e);
  }


  return (
    <div className="header-container">
      <MainMenu userDetails={userDetails} userImage={userDetails.avatar_url} open={mainMenuOpen} setOpen={setMainMenuOpen} openItem={openItem} />

      <div className="header-left-holder">
        <img alt={'logo'} style={{width: 36, height:'auto'}} onClick={() => {
          if(props.location.pathname === '/home'){
            props.history.push('/');
          }else{
            props.history.push('/home');
          }
        }}  className="header-left-image clickable" src="./drop_icon.png" />
        { props.datePickerVisible ? 
          <div onClick={() => props.openDateMenu()} className="dropdown-button">
            <p className="dropdown-button-title">{epochToDayMonth(props.selectedDropdownDate)}</p>
            <img alt={'drop-down-btn'} className="dropdown-button-icon" src="./dropdown.png"/>
          </div>
          :
          <></>
        }
      </div>
      <div className="header-right-holder">
        {props.userImageVisible ? 
          showUserAction()
        :
        <></> 
        }
        <div onClick={() => openMenu()} className="header-bar-menu-icon">
          <img height={10} width={20} style={{margin: 'auto'}} src="./menu-bars-icon.png" />
        </div>
        
      </div>
    </div>

  );
}

export default withRouter(HeaderBar);