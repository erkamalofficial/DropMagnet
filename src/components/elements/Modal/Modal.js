import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 100%;
    left: 0;
    z-index: 10000;
    background: var(--coreBlack);
    transition: all .4s;
`

const ModalBody = styled.div`
    background: var(--coreBlack);
    width: 400px;
    min-height: 200px;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;
    @media (max-width: 576px){
        width: 100%;
        height: 100%;
    }
`

const ModalHeader = styled.div`
    display: flex;

    align-items: center;
    height: auto;
    justify-content: space-between;
`

const ModalHeaderLeft = styled.div`

`

const ModalHeaderRight = styled.div`
    
`

const ModalTitle = styled.h1`

`

const ModalContent = styled.div`

`

function Modal(props){
    const {isOpen, onClose, title,children} = props;

    return(
        <ModalContainer style={{
            opacity: !isOpen ? '0': '1', 
            visibility: !isOpen ? 'hidden' : 'visible',
            top: '0'
        }}>
            <ModalBody>
                <ModalHeader>
                    <ModalHeaderLeft>
                        {title && <ModalTitle> {title}</ModalTitle>}
                    </ModalHeaderLeft>
                    <ModalHeaderRight>
                      {/* <img alt={'close-button'} style={{top: 15, right:20,display:props.isOpen ? "block": "none" ,transition: "all .4s", position: 'fixed',cursor:'pointer' }} className={'close-button'} onClick={onClose} src="./close-icon.png" /> */}
                    </ModalHeaderRight>
                </ModalHeader>
                <ModalContent>
                    {children}
                </ModalContent>
            </ModalBody>
        </ModalContainer>
    )

}

export default Modal;