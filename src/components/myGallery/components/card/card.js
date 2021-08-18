import React, {useCallback, useMemo, useState} from "react";
import styled from "styled-components";
import edit from "../../assets/edit.svg";
import link from "../../assets/link.svg";
import wallet from "../../assets/wallet.svg";
import check from "../../assets/check.svg";
import MoreBtn from "../../styled-components/moreBtn";

const CardWrapper = styled.div`
    padding: 8px 16px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`;
const CardSize = styled.div`
    max-width:382px;
    max-height: 382px;
    width:100%;
    height: calc(100vw - 32px);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    img{
        position:absolute;
        z-index:-1;
        width:100%;
        height:100%;
        object-fit:contain;
    }
`;
const LiIcon = styled.div`
    width: 39px;
    height: 39px;
    border-radius: 1000px;
    position:relative;
    background-color: rgba(40, 40, 40, 0.54);
    img{
        width:19px;
        height:19px;
        position:absolute;
        top:50%;
        left:51%;
        transform: translate(-50%, -50%) scale(0.95);
        z-index: 1;
    }
`;
const NFT = styled.div`
    padding:8px 16px;
    background-color: rgba(40, 40, 40, 0.54);
    border-radius: 100px;
    font-size: 18px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    color: #eaeaea;
    position:absolute;
    top:8px;
    right: 8px;
`;
const MenuWrapper = styled.div`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(6, 6, 6, 0.41);
    backdrop-filter: blur(10px);
    padding-top: 59px;
    padding-left:8px;
    ul{
        list-style: none;
        padding:0;
        margin:0;
        li{
            display: flex;
            align-items: center;
            cursor:pointer;
            margin-bottom: 12px;
            p{  
                margin: 0 0 0 16px;
                color: #ffffff;
                font-size: 22px;
                font-weight: 500;
                font-style: normal;
                letter-spacing: normal;
                line-height: normal;
                text-align: left;
            }
        }
    }
`;
const Artist = styled.p`
    position: absolute;
    left:0;
    right:0;
    bottom: 12px;
    margin: 0 auto;
    background-color: rgba(40, 40, 40, 0.54);
    border-radius: 100px;
    padding: 8px 16px;
    color: #eaeaea;
    width:fit-content;
    font-size: 18px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
`;
const EditModal = styled.div`
    position: absolute;
    z-index: 9999;
    top:0;
    left:0;
    width: 100%;    
    height: 100%;
    background-color: rgba(6, 6, 6, 0.41);
    backdrop-filter: blur(20px);
    padding-top: 32px;
`;
const Save = styled.button`
    border: none;
    outline: none !important;
    cursor: pointer;
    width: 39px;
    height: 39px;
    border-radius: 1000px;
    background-color: rgba(40, 40, 40, 0.54);
    position:absolute;
    top:8px;
    left: 8px;
    z-index: 1;
    img{
        width:19px;
        height:19px;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%) scale(0.95);
    }
`;
const Title = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    p{
        color: #ffffff;
        font-size: 22px;
        font-weight: 500;
        font-style: normal;
        letter-spacing: normal;
        line-height: normal;
        text-align: left;
        margin: 0 0 0 16px;
    }
    margin-bottom:24px;
`;
const Form = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const EditName = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    label{
        color: #ffffff;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        letter-spacing: normal;
        line-height: normal;
        text-align: center;
        margin-bottom: 9px; 
    }
    input{
        border-radius: 11px;
        background-color: rgba(0, 0, 0, 0.31);
        color: #ffffff;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        letter-spacing: normal;
        line-height: normal;
        text-align: center;
        padding: 16px 39px;
        border:none;
        outline: none !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
const Privacy = styled.div`
    p{
        margin: 0 0 9px 0;
        color: #ffffff;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        letter-spacing: normal;
        line-height: normal;
        text-align: center;
    }   
    .edit-tabs{
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        width: fit-content;
        margin: 0 auto;
        label{
          display: flex;
          text-transform: capitalize;
          align-items: center;
          justify-content: center;
          width: 85px;
          height: 52px;
          border-radius: 11px;
          background-color: rgba(0, 0, 0, 0.31);
          cursor: pointer;
          z-index: 2;
          color: #ffffff;
          margin: 0 8px;
          font-size: 16px;
          font-weight: 500;
          font-style: normal;
          letter-spacing: normal;
          line-height: normal;
          text-align: center;
        }
        input[type="radio"] {
          display: none;
        }
        input[id="public"] {
          &:checked {
            & ~ .glider {
              transform: translateX(0);
            }
          }
        }
        input[id="private"] {
          &:checked {
            & ~ .glider {
              transform: translateX(calc(100% + 16px));
            }
          }
        }
        input[id="smart"] {
          &:checked {
            & ~ .glider {
              transform: translateX(calc(200% + 32px));
            }
          }
        }
        .glider {
          position: absolute;
          display: flex;
          left: 0;
          align-items: center;
          justify-content: center;
          width: 85px;
          height: 52px;
          border-radius: 11px;
          border: 1px solid #dddddd;
          background-color: transparent;
          cursor: pointer;
          margin: 0 8px;
          z-index:1;
          transition: 0.25s ease-out;
        }
    }
`;
const Remove = styled.div`
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    cursor: pointer;
    margin: -7px auto 40px;
    width:fit-content;
`;
const Add = styled.div`
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    cursor: pointer;
    margin: 0 auto;
    width:fit-content;
`;


const Card = (props) => {
    const {nft, artist, image} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [walletEdit, setWalletEdit] = useState(false);
    const [activeTab, setActiveTab] = useState("public");
    const [linkCopied, setLinkCopied] = useState(false);
    const tabs = [
        {id: "public"},
        {id: "private"},
        {id: "smart"}
    ];
    const handleMenu = e => {
        e.preventDefault();
        setIsOpen(prevState => !prevState);
        setIsEdit(false);
        setWalletEdit(false);
        setLinkCopied(false);
    };
    const handleChangeTab = useCallback((id) => setActiveTab(id), []);

    const showModals = () => {
        if (isOpen && !isEdit) {
            return (
                <MenuWrapper>
                    <ul>
                        <li onClick={() => {
                            setIsOpen(false);
                            setIsEdit(true)
                        }}>
                            <LiIcon>
                                <img src={edit} alt="edit"/>
                            </LiIcon>
                            <p>Edit</p>
                        </li>
                        <li onClick={() => setLinkCopied(true)}>
                            <LiIcon>
                                <img src={link} alt="link"/>
                            </LiIcon>
                            <p>{!linkCopied ? "Copy link" : "Link copied!"}</p>
                        </li>
                        <li onClick={() => {
                            setIsOpen(false);
                            setWalletEdit(true)
                        }}>
                            <LiIcon>
                                <img src={wallet} alt="wallet"/>
                            </LiIcon>
                            <p>Wallet settings</p>
                        </li>
                    </ul>
                </MenuWrapper>
            )
        } else if (!isOpen && isEdit) {
            return (
                <EditModal>
                    <Save onClick={() => {
                        setIsOpen(true);
                        setIsEdit(false)
                    }}>
                        <img src={check} alt="check"/>
                    </Save>
                    <Title className="items-center justify-center">
                        <LiIcon>
                            <img src={edit} alt="edit"/>
                        </LiIcon>
                        <p>Edit</p>
                    </Title>
                    <Form>
                        <EditName>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" value={"Alexander Newton"} readOnly={true}/>
                        </EditName>
                    </Form>
                    <Privacy>
                        <p>Privacy</p>
                        <div className='edit-tabs'>
                            {
                                tabs.map((tab, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <label key={i} htmlFor={tab.id}
                                                   onClick={() => handleChangeTab(tab.id)}>{tab.id}</label>
                                            <input type="radio" id={tab.id} name="tabs"
                                                   defaultChecked={tab.id === activeTab}/>
                                        </React.Fragment>
                                    )
                                })
                            }
                            <span className="glider"/>
                        </div>
                    </Privacy>
                </EditModal>
            )
        } else if (!isOpen && walletEdit) {
            return (
                <EditModal>
                    <Save onClick={() => {
                        setIsOpen(true);
                        setIsEdit(false)
                    }}>
                        <img src={check} alt="check"/>
                    </Save>
                    <Title className="items-center justify-center">
                        <LiIcon>
                            <img src={edit} alt="edit"/>
                        </LiIcon>
                        <p>Wallet Settings</p>
                    </Title>
                    <Form>
                        <EditName>
                            <label htmlFor="name">Connected Wallet</label>
                            <input id="name" type="text" value={"oxda48198jkj38hy91hkjhuih"} readOnly={true}/>
                        </EditName>
                    </Form>
                    <Remove>remove</Remove>
                    <Add>Add another wallet</Add>
                </EditModal>
            )
        } else {
            return null
        }
    }
    const memoizedShowModals = useMemo(showModals, [showModals])


    return (
        <CardWrapper>
            <CardSize>
                <img src={image} alt="back"/>
                <MoreBtn handleClick={handleMenu} isOpen={isOpen}/>
                <NFT>{nft} NFTs</NFT>
                <Artist>{artist}</Artist>
                {memoizedShowModals}
            </CardSize>
        </CardWrapper>
    )
}

export default React.memo(Card)