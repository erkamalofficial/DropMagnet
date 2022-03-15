import React, { useMemo, useState, useContext, useEffect } from 'react';
import { Link, useHistory, withRouter, matchPath } from 'react-router-dom'
import "./HeaderBar.css"
import MainMenu from '../../detail_page/MainMenu/MainMenu'
import DatePicker from 'react-datepicker'
import CustomDateInput from './CustomDateInput';
import Avatar from '../Avatar/Avatar';
import { getInitials } from '../../../utils';
import { Row } from "../../exploreGalleries/styled-components/Row";
import { Link as HeaderLink } from "../../exploreGalleries/styled-components/Link";
import Logo from "../../dropMagnet/assets/logo.svg";
import DropMagnetLogo from "../../dropMagnet/assets/dropMagnetlogo.svg";
import { GlobalContext } from '../../../utils/GlobalContext';
import { useSelector } from 'react-redux';
import { useFetchUserProfileQuery } from '../../../store/api/DropApi';

function HeaderBar(props) {
  const { token, userId } = useSelector((state) => state.auth);
  const { data: userDetails, isSuccess: isProfileFetched } = useFetchUserProfileQuery(userId)
  const headerLoad = sessionStorage.getItem('headerLoad')
  const [userProfile, setUserProfile] = useState(null)

  // const { curUser } = useContext(GlobalContext)

  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  // let userDetails = JSON.parse(localStorage.getItem('userDetails'));
  // userDetails = userDetails ? userDetails : curUser

  const h = useHistory();
  const match = matchPath(h.location.pathname, {
    path: '/metaurl/:link/:user/:id',
    exact: true,
    strict: false
  })
  let pageName = h.location.pathname.split('/')[1].toLowerCase()
  pageName = pageName === '' ? 'Landing Page' : pageName

  function showUserAction() {
    if (props && props.userLoggedIn && userProfile && h.location.pathname !== '/profile') {
      return <Link to={'/profile'} style={{ textDecoration: 'none' }}>
        <div className="header-profile-img-holder">
          <Avatar userImage={userProfile.avatar_url}
            initial={getInitials(userProfile.name)}
            view_only
            small />
          {/* <img className="header-right-image" src={userDetails.avatar_url || './add-user-icon.png'}/> */}
        </div>
      </Link>
    } else {
      return null
    }
  }

  useEffect(() => {
    if (isProfileFetched) {
      setUserProfile(userDetails)
    }
  }, [token, isProfileFetched])

  function openMenu() {
    setMainMenuOpen(true)
  }

  function openItem(e) {
  }

  if (match?.isExact) {
    return null
  }

  return (
    <div className="header-container">
      {userProfile && <MainMenu userDetails={userProfile} userImage={userProfile.avatar_url} open={mainMenuOpen} setOpen={setMainMenuOpen} openItem={openItem} />}

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

        {props.datePickerVisible && headerLoad && headerLoad === 'true' ? (
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
        ) : (props.datePickerVisible ? (
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
        ) : <img className="header-right-image" src={DropMagnetLogo} />)}
      </div>

      {
        pageName !== 'verify' && (
          <div className="header-right-holder">
            {props.userImageVisible ?
              showUserAction()
              :
              <></>
            }
            {userProfile ? (
              <div onClick={() => setMainMenuOpen(!mainMenuOpen)} className="header-bar-menu-icon"
                style={{ zIndex: 999999999999 }}>
                <div className={`menu-icon ${mainMenuOpen ? 'close-icon' : ''}`}>
                  <div className="leftright" />
                  <div className="rightleft" />
                </div>
                {/* <img height={10} width={20}
              style={{ margin: 'auto' }}
              src="./menu-bars-icon.png" alt="/" /> */}
              </div>
            ) : props.dropId !== undefined ? (
              <Link to={`/login/redirect/${props.dropId}`} id="login-link">Log In</Link>
            ) : <Link to={`/`} id="login-link">Log In</Link>}
          </div>
        )
      }
    </div>

  );
}

export default withRouter(HeaderBar);