import Modal from 'react-modal';
import React, {useState} from "react";
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
    
    .element-container {
      padding-top: 16px;
      
      .element-container-title {
         margin-bottom: 16px;
      }
    }
    
    .delete-link {
      color: #FF7171;
      font-size: 18px;
      font-weight: 400px;
      margin-top: 39px;
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

const DescriptionElement = styled.div`
    font-size: 18px;
    max-width: 342px;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
    border: 0.75px solid #000000;
    padding: 10px 0;
    border-radius: 9px;
    font-family: Azo Sans;
    font-weight: 400;
`;

const AddLinkModal = ({isOpen, closeModal}) => {

    const [deleteLinkToggle, setDeleteLinkToggle] = useState(false)

    return (
        <Modal
            closeTimeoutMS={200}
            isOpen={isOpen}
            onRequestClose={closeModal}
            className='sharing'
        >
            <ComponentContainer>
                <header className='header-title'>
                    <div>Add Link</div>
                </header>
                <Content>
                    <div className='content'>
                        <div className='element-container'>
                            <div className='element-container-title'>Title</div>
                            <DescriptionElement>
                                Enter Title Here (Max charachters)
                            </DescriptionElement>
                        </div>
                        <div className='element-container'>
                            <div className='element-container-title'>Link</div>
                            <DescriptionElement>
                                www.moviefarm.com
                            </DescriptionElement>
                        </div>

                        {
                            deleteLinkToggle ? <div className='delete-link'>delete link</div> : null
                        }
                    </div>
                </Content>

                <div className="btn-wrap">
                    {

                        deleteLinkToggle
                            ? <>
                                <button
                                    className='close-btn'
                                    onClick={() => {
                                      closeModal();
                                      setDeleteLinkToggle(false);
                                    }}
                                >
                                    Finish Editing
                                </button>
                              </>

                            : <>
                                <button
                                    className='close-btn'
                                    onClick={() => {
                                      closeModal();
                                    }}
                                >
                                    Exit
                                </button>

                                <button
                                    className='close-btn'
                                    onClick={() => {
                                      setDeleteLinkToggle(true);
                                    }}
                                >
                                    Publish
                                </button>
                            </>
                    }
                </div>
            </ComponentContainer>
        </Modal>
    )
}

export default AddLinkModal;