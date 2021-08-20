import Modal from 'react-modal';
import React, {useState} from "react";
import styled from "styled-components";
import CircleIcon from "../newUserContent/styled-components/icon-wrapper";

import discord from "../../assets/Discord.svg";
import telegram from "../../assets/Telegram.svg";
import openSea from "../../assets/Open Sea.svg";
import rarible from "../../assets/Rarible.svg";
import instagram from "../../assets/Instagram.svg";

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
    color: #ffffff;
    font-weight: 400;

    header {
      display: flex;
      align-items: center;
      justify-content: center; 
      position: relative;
      margin: 16px 0 28px 0;
      
      img {
        position: absolute;
        padding: 0;
        right: 16px;
        top: 0;
      }  
                
    }
    
    .header-title {
        font-weight: 500;
        margin: 16px 0 28px 0;
    }
    
    .add-btn {
      background: none; 
      outline: none;
      border: none;
      
      div {
        padding: 8px 16px;
        background-image: linear-gradient(rgba(0, 0, 0, 0.61) 0%, rgba(0, 0, 0, 0.61) 100%);
        color: #EAEAEA;
        font-size: 18px;
        border-radius: 26px;
        border: 0.75px solid #000;

      }  
    }
    
    .btn-margin-right {
      margin-right: 16px;
    }
    
    .footer-btns {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 17px;
      margin: 0 auto;
    }
 
    .btn-additional {
      min-width: 94px; 
      font-size: 18px;
      padding: 8px 16px;
      background: none;
      outline: none;
      border: 0.75px solid #000000;
      border-radius: 26px;
      color: #ffffff;
      background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
    }
`;


const SocialMediaLinks = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .icon-wrapper {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      
      p {
        margin-left: 17px; 
      }
      
      .custom-btn {
        width: 62px;
        height: 42px;
        border-radius: 9px;
        background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
        border: 0.75px solid #000000;
      }
    }
    
`;

const Content = styled.div`
       
    .content {
      margin: 0 17px;
      background-color: transparent;
      position: relative;
    }
    
    .description {
      font-size: 18px;
      margin-top: 108px;
      margin-bottom: 32px;
      
      div {
        margin-top: 16px;
      }
    }
    
    .slots-text {
      color: #676767;
      margin-top: 38px;  
    }
`;

const AddButtonsModal = ({isOpen, closeModal}) => {

    const [footerBtnsToggle, setFooterBtnsToggle] = useState(false);


    return (
        <Modal
            closeTimeoutMS={200}
            isOpen={isOpen}
            onRequestClose={closeModal}
            className='sharing'
        >
            <ComponentContainer>
                <header className='header-title'>
                    <div>Add Buttons</div>
                </header>
                <Content>
                    <div className='content'>

                        <SocialMediaLinks>
                            <div className='icon-wrapper'>
                                <CircleIcon imgUrl={discord} alt={"icon"} className='social-media'/>
                                <p>Add Discord</p>
                            </div>
                            <div className='icon-wrapper'>
                                <CircleIcon imgUrl={telegram} alt={"icon"} className='social-media'/>
                                <p>Add Telegram</p>
                            </div>
                            <div className='icon-wrapper'>
                                <CircleIcon imgUrl={openSea} alt={"icon"} className='social-media'/>
                                <p>Add OpenSea</p>
                            </div>
                            <div className='icon-wrapper'>
                                <CircleIcon imgUrl={rarible} alt={"icon"} className='social-media'/>
                                <p>Add Rarible</p>
                            </div>
                            <div className='icon-wrapper'>
                                <CircleIcon imgUrl={instagram} alt={"icon"} className='social-media'/>
                                <p>Add Instagram</p>
                            </div>
                            <div className='icon-wrapper'>
                                <div className='custom-btn'> </div>
                                <p>Add Custom</p>
                            </div>
                        </SocialMediaLinks>
                        <div className='footer-content'>
                            {
                                !footerBtnsToggle
                                     ?  <div className='footer-btns'>
                                          <button className='btn-additional btn-margin-right' onClick={() => {
                                            closeModal();
                                          }}>
                                              Exit
                                          </button>
                                          <button className='btn-additional' onClick={() => {
                                              setFooterBtnsToggle(true);
                                          }}
                                          >
                                              Publish
                                          </button>
                                        </div>
                                     :  <>
                                          <div className='description'>
                                            Maximum buttons added for this slide
                                            <div>Overflow will create a new slide</div>
                                          </div>

                                          <button
                                            className='btn-wrap btn-additional'
                                            onClick={() => {
                                                closeModal();
                                                setFooterBtnsToggle(false)
                                            }}
                                          >
                                            Finish Editing
                                          </button>
                                        </>
                            }
                        </div>
                    </div>
                </Content>
            </ComponentContainer>
        </Modal>
    )
}

export default AddButtonsModal;