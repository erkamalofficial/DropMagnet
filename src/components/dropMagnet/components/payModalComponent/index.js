import Modal from 'react-modal';
import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

Modal.setAppElement('#portal');

const ComponentContainer = styled.div`
    width: 100%;
    height: 100%;
    max-height: 100vh;
    align-items: center;
    background-color: #292929;
    backdrop-filter: blur(10px);
    position: fixed;
    z-index: 1200;
    text-align: center;
    color: #fff;
    font-weight: 400;
    padding: 0 16px;
    
    .title {
      color: #fff;
      font-size: 14px;
      font-weight: 900;
      font-style: italic;
      margin: 80px 0  17px 0;
    }
    
    .link {
      width: 100%;
      max-width: 346px;
      padding: 10px 0 9px 0;
      border-radius: 6px;
      background-color: #303030;
      margin: 0 auto;
      cursor: pointer;
              
      a {
        color: #ffffff;
        font-size: 14px;
        font-weight: 500;
        font-style: italic;
      }
    }
    
    .info {
      font-weight: 300;
      font-size: 14px;
      color: #fff;
      margin-top: 16px;
    }
    
    .or {
      margin: 32px 0;
    }
    
    .metamask {
      width: 100%;
      max-width: 368px;
      border: 1px solid #F6851A;
      background-color: #262626;
      color: #F6851A;
      font-size: 20px;
      font-weight: 900;
      border-radius: 7px;
      margin: 0 auto;
      padding: 13px;
      
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .metamask-text {
      margin-right: 22px;
    }
    
    .condition-btn {
      font-size: 12px;
      font-weight: 400;
      color: #fff;
      border: none;
      background: none;
      outline: none;
      position: absolute;
      right: 0;
      left: 0;
      margin: 0 auto;
      bottom: 27px;
      cursor: pointer;
    }
    
    .close-btn {
      width: 32px;
      height: 32px;
      border-radius: 100%;
      position: absolute;
      border: none;
      background: #4E4E4E;
      left: 16px;
      top: 16px;
    }
`;

// const DescriptionElement = styled.div`
//     font-size: 18px;
//     max-width: 342px;
//     color: #fff;
//     text-align: center;
//     margin: 0 auto;
//     background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
//     border: 0.75px solid #000000;
//     padding: 10px 0;
//     border-radius: 9px;
//     font-family: Azo Sans;
//     font-weight: 400;
// `;

const PayModalComponent = ({isOpen, closeModal}) => {

    return (
        <Modal
            closeTimeoutMS={200}
            isOpen={isOpen}
            onRequestClose={closeModal}
            className='pay'
        >
            <ComponentContainer>
                <button className='close-btn' onClick={() => closeModal()}/>
                <h5 className='title'>SEND CRYPTO TO ME.LINK/ALEXANDERNEWTON</h5>
                <div className='link'>
                    <NavLink to="#">0xdasjnk4q98h9e28hdiuhhuaiuhwn828288..djak</NavLink>
                </div>

                <div className='info'>Tap wallet address above to copy to clipboard.</div>
                <div className='or'>or</div>
                <div className='metamask'>
                    <span className='metamask-text'>Auto-Fill In MetaMask</span>
                    <img src="https://raw.githubusercontent.com/MetaMask/brand-resources/c3c894bb8c460a2e9f47c07f6ef32e234190a7aa/SVG/metamask-fox.svg" alt='ico' height="68" width="68"/>
                </div>
                <div className='condition-btn'>Terms & Conditions</div>
            </ComponentContainer>
        </Modal>
    )
}

export default PayModalComponent;