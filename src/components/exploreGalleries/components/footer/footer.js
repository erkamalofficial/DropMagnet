import React from "react";
import {Row} from "../../styled-components/Row";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const FooterLink = styled(NavLink)`
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  color: #eaeaea;
  font-size: 14px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  display: block;
  text-decoration: none;
  padding: 8px 10px;
  min-width: fit-content;
  @media(max-width: 374px){
    display: none;
  }
`;
const FooterLinkWrapper = styled.div`
  padding-bottom: 8px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  @media(max-width: 480px){
    margin-bottom: 0;
  }
`;

const Footer = () => {
    return (
            <Row className="items-center justify-center flex-wrap">
                <FooterLinkWrapper>
                    <FooterLink to="/drop-magnet">Terms & Conditions</FooterLink>
                    <FooterLink to="/drop-magnet">Privacy Policy</FooterLink>
                    <FooterLink to="/drop-magnet">© Drop Magnet 2021</FooterLink>
                </FooterLinkWrapper>
            </Row>
    )
}

export default Footer