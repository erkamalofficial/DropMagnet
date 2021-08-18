import React from "react";
import styled from "styled-components";


const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    display: none;
    &:checked + label .menu {
      transform:scale(1.04) rotate(180deg);
    }
    &:checked + label .menu .menu_part:nth-of-type(1) {
      transform: rotate(45deg);
      width: 24px !important;
      top: calc(50% - (2.5px))!important;
    }
    &:checked + label .menu .menu_part:nth-of-type(2) {
      left: -15px !important;
      opacity: 0;
    }
    &:checked + label .menu .menu_part:nth-of-type(3) {
      transform: rotate(-45deg);
      width: 24px!important;
      top: calc(50% - (2.5px))!important;
    }
`;
const Menu = styled.div`
    transition: all 0.21s;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    cursor: pointer;
      .menu_part {
      width: 5px;
      height: 5px;
      position: absolute;
      background: #fff;
      right: 0;
      margin: auto;
      left: 0;
      border-radius: 5px;
      transition: all 0.21s cubic-bezier(0.8, 0.1, 0.2, 1.8);
      &:nth-of-type(1) {
        top: calc(50% - ((9.5px)) + 0px);
        width: 5px
      }
      &:nth-of-type(2) {
        top: calc(50% - ((9.5px)) + 7px);
        width: 5px
      }
      &:nth-of-type(3) {
        top: calc(50% - ((9.5px)) + 14px);
        width: 5px
      }
    }
`;

const MoreBtnWrapper = styled.div`
    width: 39px;
    height: 39px;
    border-radius: 1000px;
    background-color: rgba(40, 40, 40, 0.54);
    cursor:pointer;
    position:absolute;
    top:8px;
    left: 8px;
    z-index: 1;
`;

const MoreBtn = ({handleClick, isOpen}) => {
    return (
        <MoreBtnWrapper onClick={(e) => handleClick(e)}>
            <Checkbox id="menu-125" checked={isOpen} readOnly={true}/>
                <label htmlFor="menu-125">
                    <Menu className="menu">
                        <div className="menu_part" />
                        <div className="menu_part" />
                        <div className="menu_part" />
                    </Menu>
                </label>
        </MoreBtnWrapper>
    )
}

export default MoreBtn;

