import React, { useState } from "react"
import { Logo } from "../../styled-components/Logo";
import { Link as HeaderLink } from "../../styled-components/Link";
import { Row } from "../../styled-components/Row";
import { DropDownBtn } from "../../styled-components/DropDownBtn";
// import {UserLogo} from "../../styled-components/UserLogo";
import "./navbar.css"
import MainMenu from "../../../detail_page/MainMenu/MainMenu";
import Avatar from "../../../elements/Avatar/Avatar";
import { getInitials } from "../../../../utils";
import FadeIn from "react-fade-in";
import { Link, useHistory } from "react-router-dom";

const Navbar = () => {

    const [mainMenuOpen, setMainMenuOpen] = useState(false)
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    const headerLoad = sessionStorage.getItem('headerLoad')
    const history = useHistory()

    function showUserAction() {
        if (userDetails) {
            return <Link to={'/profile'} style={{ zIndex: 999999999999, textDecoration: 'none' }}>
                {headerLoad && headerLoad === 'true' ? (
                    <div className="header-profile-img-holder">
                        <Avatar userImage={userDetails.avatar_url}
                            initial={getInitials(userDetails.name)}
                            view_only
                            small />
                    </div>
                ) : (
                    <FadeIn delay={50} childClassName="child-content">
                        <div className="header-profile-img-holder">
                            <Avatar userImage={userDetails.avatar_url}
                                initial={getInitials(userDetails.name)}
                                view_only
                                small
                                style={{ marginTop: 2 }} />
                        </div>
                    </FadeIn>
                )}
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
            <nav className="navbar">

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

                        {headerLoad && headerLoad === 'true' ? (
                            <HeaderLink to="/">
                                Home
                            </HeaderLink>
                        ) : (
                            <FadeIn delay={50} childClassName="child-content">
                                <HeaderLink to="/">
                                    Home
                                </HeaderLink>
                            </FadeIn>
                        )}
                    </Row>

                    {/* <Row>
                        <Logo />
                    </Row> */}

                    <Row className="items-center">
                        {showUserAction()}
                        {/* <DropDownBtn /> */}
                        <div onClick={() => setMainMenuOpen(!mainMenuOpen)} className="nav-bar-menu-icon"
                            style={{ zIndex: 999999999999 }}>
                            <div class={`menu-icon ${mainMenuOpen ? 'close-icon' : ''}`}>
                                <div class="leftright"></div>
                                <div class="rightleft"></div>
                            </div>

                            {/* <img height={10} width={20}
                                style={{ margin: 'auto' }}
                                src="./menu-bars-icon.png" alt="/" /> */}
                        </div>
                    </Row>
                </Row>
            </nav>
        </>
    )
}

export default Navbar