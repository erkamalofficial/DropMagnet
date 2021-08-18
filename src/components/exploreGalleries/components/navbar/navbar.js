import React from "react"
import {Logo} from "../../styled-components/Logo";
import {Link} from "../../styled-components/Link";
import {Row} from "../../styled-components/Row";
import {DropDownBtn} from "../../styled-components/DropDownBtn";
// import {UserLogo} from "../../styled-components/UserLogo";

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <Row className="justify-between">
                    <Row className="items-center">
                        <Link to="/explore-galleries">
                            Home
                        </Link>
                    </Row>
                    <Row>
                        <Logo/>
                    </Row>
                    <Row className="items-center">
                        <DropDownBtn/>
                        {/*<UserLogo/>*/}
                    </Row>
                </Row>
            </nav>
        </>
    )
}

export default Navbar