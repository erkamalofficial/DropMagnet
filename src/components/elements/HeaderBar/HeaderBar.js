import React, { useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom'
import "./HeaderBar.css"
import MainMenu from '../../detail_page/MainMenu/MainMenu'
import DatePicker from 'react-datepicker'
import CustomDateInput from './CustomDateInput';
import Avatar from '../Avatar/Avatar';
import { getInitials } from '../../../utils';
import { Row } from "../../exploreGalleries/styled-components/Row";
import { Link as HeaderLink } from "../../exploreGalleries/styled-components/Link";
import FadeIn from 'react-fade-in'
import Logo from "../../dropMagnet/assets/logo.svg"

function HeaderBar(props) {

  const headerLoad = sessionStorage.getItem('headerLoad')

  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  const h = useHistory()
  let pageName = h.location.pathname.split('/')[1].toLowerCase()
  pageName = pageName === '' ? 'Landing Page' : pageName

  function showUserAction() {
    if (props && props.userLoggedIn && userDetails) {
      return <Link to={'/profile'} style={{ zIndex: 999999999999, textDecoration: 'none' }}>

        <div className="header-profile-img-holder">
          <Avatar userImage={userDetails.avatar_url}
            initial={getInitials(userDetails.name)}
            view_only
            small />
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
  }


  return (
    <div className="header-container">
      {userDetails && <MainMenu userDetails={userDetails} userImage={userDetails.avatar_url} open={mainMenuOpen} setOpen={setMainMenuOpen} openItem={openItem} />}

      <div className="header-left-holder">
        <img alt={'logo'}
        onClick={() => {
          if (props.location.pathname === '/home') {
            props.history.push('/');
          } else {
            props.history.push('/home');
            sessionStorage.removeItem('headerLoad')
          }
        }} className="header-left-image clickable" src={Logo} />

        {headerLoad && headerLoad === 'true' ? (
          <Row className="items-center">
            <HeaderLink to={pageName !== 'swiper' ? "/" : '/swiper'}
              style={{ textTransform: 'capitalize' }}>
              <>
                {pageName !== 'swiper' ? <p className={"page-name"}>{pageName}</p> : (
                  <div className="react-datepicker-container" style={{ zIndex: '999' }}>
                    <DatePicker
                      selected={new Date(props.curIndex)}
                      onChange={(date) => props.setSelectedDropdownDate(date)}
                      customInput={<CustomDateInput />}
                    />
                  </div>
                )}
              </>
            </HeaderLink>
          </Row>
        ) : (

          <Row className="items-center">
            <HeaderLink to={pageName !== 'swiper' ? "/" : '/swiper'}
              style={{ textTransform: 'capitalize' }}>
              {pageName !== 'swiper' ? <p className={"page-name"}>{pageName}</p> : (
                <div className="react-datepicker-container" style={{ zIndex: '999' }}>
                  <DatePicker
                    selected={new Date(props.curIndex)}
                    onChange={(date) => props.setSelectedDropdownDate(date)}
                    customInput={<CustomDateInput />}
                  />
                </div>
              )}
            </HeaderLink>
          </Row>
        )}
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
        ) : props.dropId!==undefined ? (
          <Link to={`/login/redirect/${props.dropId}`} id="login-link">Log In</Link>
        ): <Link to={`/login`} id="login-link">Log In</Link>}
      </div>
    </div>

  );
}

export default withRouter(HeaderBar);