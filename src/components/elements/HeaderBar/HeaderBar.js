import React, { useState, useEffect } from 'react';
import { LogoTitleSection, LogoTitle } from "./LogoTitles";

import { Link, Redirect, useHistory, withRouter } from 'react-router-dom'
import "./HeaderBar.css"
import { epochToDayMonth } from '../../../helpers/DateFormatter';
import MainMenu from '../../detail_page/MainMenu/MainMenu'
import DatePicker from 'react-datepicker'
import CustomDateInput from './CustomDateInput';
import Avatar from '../Avatar/Avatar';
import { getInitials } from '../../../utils';
import { MenuOpen } from '@material-ui/icons';
// import "./DatePicker.css"


function HeaderBar(props) {
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  function showUserAction() {
    if (props && props.userLoggedIn && userDetails) {
      return <Link to={'/profile'} style={{ zIndex: 999999999999 }}>
        <div className="header-profile-img-holder">
          <Avatar userImage={userDetails.avatar_url}
            initial={getInitials(userDetails.name)}
            view_only
            small
            style={{ marginTop: 2 }} />
          {/* <img className="header-right-image" src={userDetails.avatar_url || './add-user-icon.png'}/> */}
        </div>
      </Link>
    } else {
      return null
    }


  }

  function openMenu() {
    setMainMenuOpen(true)
  }

  function openItem(e) {
    console.log(e);
  }

  console.log(userDetails)


  return (
    <div className="header-container">
      {userDetails && <MainMenu userDetails={userDetails} userImage={userDetails.avatar_url} open={mainMenuOpen} setOpen={setMainMenuOpen} openItem={openItem} />}

      <div className="header-left-holder">
        <img alt={'logo'} style={{ width: 36, height: 'auto' }} onClick={() => {
          if (props.location.pathname === '/home') {
            props.history.push('/');
          } else {
            props.history.push('/home');
          }
        }} className="header-left-image clickable" src="./drop_logo.png" />
        <LogoTitleSection style={{ display: props.isLogoNotVisible ? 'none' : 'block' }}>
          <LogoTitle>drop magnet</LogoTitle>
          <div>#ThreeTheWeb</div>
        </LogoTitleSection>
        {props.datePickerVisible ?
          <div className="react-datepicker-container" style={{ zIndex: '999' }}>
            <DatePicker
              selected={new Date(props.curIndex)}
              onChange={(date) => props.setSelectedDropdownDate(date)}
              customInput={<CustomDateInput />}
            />
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
        {userDetails ? (
          <div onClick={() => setMainMenuOpen(!mainMenuOpen)} className="header-bar-menu-icon"
            style={{ zIndex: 999999999999 }}>
            <div class={`menu-icon ${mainMenuOpen ? 'close-icon' : ''}`}>
              <div class="leftright"></div>
              <div class="rightleft"></div>
            </div>
            {/* <img height={10} width={20}
              style={{ margin: 'auto' }}
              src="./menu-bars-icon.png" alt="/" /> */}
          </div>
        ) : <Link to={`/login/redirect/${props.dropId}`} id="login-link">Log In</Link>}

      </div>
    </div>

  );
}

export default withRouter(HeaderBar);