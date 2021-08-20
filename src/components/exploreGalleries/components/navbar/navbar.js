import React, { useState } from "react"
import { Logo } from "../../styled-components/Logo";
import { Link } from "../../styled-components/Link";
import { Row } from "../../styled-components/Row";
import { DropDownBtn } from "../../styled-components/DropDownBtn";
// import {UserLogo} from "../../styled-components/UserLogo";
import "./navbar.css"
import MainMenu from "../../../detail_page/MainMenu/MainMenu";

const Navbar = () => {

    const [mainMenuOpen, setMainMenuOpen] = useState(false)
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

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
                        <Link to="/">
                            Home
                        </Link>
                    </Row>
                    <Row>
                        <Logo />
                    </Row>
                    <Row className="items-center">
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
                        {/*<UserLogo/>*/}
                    </Row>
                </Row>
            </nav>
        </>
    )
}

export default Navbar