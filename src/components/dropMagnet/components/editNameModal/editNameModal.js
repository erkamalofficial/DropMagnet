import React, {useRef} from "react";
import styled from "styled-components";


const BlurModalWrapper = styled.div`
    position:absolute;
    width:100%;
    height:100vh;
    top: 0;
    left: 0;
    z-index: 1000;
    padding-top:267px;
    display: flex;
    align-items:center;
    flex-direction: column;
    backdrop-filter: blur(0);
    animation: blur .15s forwards;
    @keyframes blur {
      from { backdrop-filter: blur(0);}
      to { backdrop-filter: blur(20px);}
    }
    @media(max-width: 500px){
    padding-top:172px;
    }
    @media(max-width: 391px) {
      padding-top:126px;
    }
`;
const Title = styled.div`
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    text-decoration: underline;
    margin-bottom:88px;
`;
const NameInput = styled.input`
    width: 236px;
    height: 46px;
    padding: 12px 0 10px;
    border-radius: 100px;
    background-color: #101010;
    border: none;
    outline: none;
    margin: 0 auto;
    color: #eaeaea;
    font-size: 24px;
    font-weight: 400;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    margin-bottom:24px;
    &:placeholder{
        color: #eaeaea;
        font-size: 24px;
        font-weight: 700;
    }
`;
const DoneBtn = styled.button`
    width: 85px;
    height: 46px;
    border-radius: 26px;
    background-color: #101010;
    border:none;
    outline:none;
    padding:0;
    cursor:pointer;
    font-size: 24px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
`;
const ClipText = styled.p`
        background: linear-gradient(to right, #d600ff 0%, #6600ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin:0
`;

const BlurModal = ({close,open, name, setName}) => {
    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const inputRef = useRef(null);


    return (
        <>
            {
                open ?
                    <BlurModalWrapper className="active">
                        <Title onClick={() => inputRef.current.focus()}>Edit Name</Title>
                        <NameInput
                            type="text"
                            ref={inputRef}
                            value={name}
                            placeholder="Name"
                            onChange={handleChangeName}/>
                        <DoneBtn>
                            <ClipText onClick={close}>
                                Done
                            </ClipText>
                        </DoneBtn>
                    </BlurModalWrapper>
                    : null
            }
        </>

    )
}


export default BlurModal