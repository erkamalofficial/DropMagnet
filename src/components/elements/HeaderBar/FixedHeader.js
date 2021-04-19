import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom'
import HeaderTitleBtn from '../../blocks/header-title-btn';
import styled from 'styled-components';

const HeaderProfileHolder = styled.div`
    height: 36px;
    width: 36px;
    display: inline-block;
    position: relative;
    border-radius: 50%;
    box-shadow: inset 0 -1px 0px rgba(40, 0, 65, 1.0);
    margin-left: 16px;
`;

const Avatar = styled.img`
    height: 36px;
    width: 36px;
    cursor: pointer;
    border-radius: 19px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: -1;
    border-radius: 50%;
    display: block;
`;
const FixedHeaderWrapper = styled.div`
    position: fixed;
    flex-direction: column;
    background-color: ${({ isMagGallery }) => isMagGallery ? 'rgb(0,0,0, 0)' : 'rgb(0,0,0)'};
    @media (max-width: 600px) {
        background-color: var(--coreBlack);
    }
    width: 100%;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 9998;
    padding: 16px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const HeaderHolder = styled.div`
    display: flex;
    flex-direction: row;
    height: 36px;
    padding: 0 20px;
`;
const Logo = styled.img`
    height: 34px;
    width: 30px;
`;

const HeaderBarMenuIcon = styled.div`
    height: 36px;
    width: 36px;
    border-radius: 19px;
    cursor: pointer;
    background: linear-gradient(#2E2E2E, #1E1E1E);
    box-shadow: inset 0 -1px 0px rgba(40, 0, 65, 1.0), 
                0 2px 4px rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-self: center;
`;


const FixedHeader = (props) => {

    function showUserAction() {
        if (props.userLoggedIn) {
            return <Link to={'/profile'}>
                <HeaderProfileHolder>
                    <Avatar src={props.userDetails.image} />
                </HeaderProfileHolder>
            </Link>
        } else {
            return <Link to={'/login'}>
                <button className="login-button">Log in</button>
            </Link>
        }
    }
    return (
        <FixedHeaderWrapper isMagGallery={props.isMagGallery}>
            <HeaderHolder>
                <Logo src="./dropmagnet-small-logo.png" />
                {props.isMagGallery &&
                    <HeaderTitleBtn>
                        <span>Mag.Link/TIME</span>
                    </HeaderTitleBtn>
                }
            </HeaderHolder>
            <HeaderHolder>
                <HeaderBarMenuIcon>
                    <img height={10} width={20} style={{ margin: 'auto' }} src="./menu-bars-icon.png" />
                </HeaderBarMenuIcon>
                {showUserAction()}
            </HeaderHolder>
        </FixedHeaderWrapper>
    )
};

export default FixedHeader;