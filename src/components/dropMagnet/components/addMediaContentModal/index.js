import Modal from 'react-modal';
import React from "react";
import styled from "styled-components";

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
      margin: 16px 0;
      
      img {
        position: absolute;
        padding: 0;
        right: 16px;
        top: 0;
      }  
                
    }
    
    .header-title {
        font-weight: 500;
        margin: 16px 0;
      }
      
    .title-wrap {
      display: flex;
      justify-content: center;
      
      div {
        margin: 0 32px;
      }
    }
    
    .title {
       font-weight: 500;
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
     
    .btn-wrap {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 17px;
      margin: 0 auto;
    }
            
    .close-btn {
      font-size: 18px;
      min-width: 94px;
      padding: 8px 16px;
      background: none;
      outline: none;
      border: 0.75px solid #000000;
      border-radius: 26px;
      color: #ffffff;
      margin: 0 16px;
      background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
    }
`;

const Content = styled.div`
       
    .content {
      margin: 0 25px;
      background-color: transparent;
      position: relative;
      
      textarea {
        background-color: #D8D8D8;
        border: 1px solid #979797;
        height: 130px;
        width: 100%;
        border-radius: 8px;
        margin-top: 16px;
        outline: none;
        padding: 16px;
      }
    }
    
    .description {
      font-size: 18px;
      margin-top: 108px;
      margin-bottom: 32px;
      
      div {
        margin-top: 16px;
      }
    }
    
`;

const AddMediaModal = ({isOpen, closeModal}) => {

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
                          <div className='title-wrap'>
                             <div className='title'>From Wallet</div>
                             <div className='title'>Enter Web Link</div>
                          </div>
                          <div className='content'>
                              <textarea />
                          </div>
                      </Content>

                      <div className="btn-wrap">
                          <button className='close-btn' onClick={() => {
                              closeModal();
                          }}>Exit</button>

                          <button className='close-btn' onClick={() => {
                              closeModal();
                          }}>Publish</button>
                      </div>
                  </ComponentContainer>
            </Modal>
    )
}

export default AddMediaModal;