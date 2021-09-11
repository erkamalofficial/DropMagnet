import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import edit from "../../assets/edit.svg";
import link from "../../assets/link.svg";
import wallet from "../../assets/wallet.svg";
import check from "../../assets/check.svg";
import MoreBtn from "../../styled-components/moreBtn";
import "./card.css"
import web3 from 'web3'
import AddWallet from "./addWallet";
import QRCode from 'qrcode'
import * as DropMagnetAPI from "../../../../DropMagnetAPI"
import { useAuth } from "../../../../contexts/FirebaseAuthContext"
import LoadingModal from "../../../elements/LoadingModal/LoadingModal.js"

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
    border-radius: 5px;
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
    border-radius: 5px;
    padding: 8px 16px;
    color: #eaeaea;
    width:fit-content;
    font-size: 18px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis
`;
const EditModal = styled.div`
    position: absolute;
    z-index: 999;
    top:0;
    left:0;
    width: 100%;    
    height: 100%;
    background-color: rgba(6, 6, 6, 0.41);
    backdrop-filter: blur(20px);
    padding-top: 8px;
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
    margin-bottom:14px;
`;
const Form = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-Y: scroll
`;
const Address = styled.div`
    display:flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 18px 0;
    cursor: pointer
`

const EditName = styled.div`
    display:flex;
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
        width: 90%;
        height: fit-content;
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
    width:fit-content;
`;


const Card = (props) => {

    const { metaurl, image, id } = props;
    const cntWallets = JSON.parse(localStorage.getItem('cntWallets'))
    const { currentUser } = useAuth()

    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [walletEdit, setWalletEdit] = useState(false);
    const [activeTab, setActiveTab] = useState("public");
    const [linkCopied, setLinkCopied] = useState(false);

    const [loading, setLoading] = useState(false)

    const [tnc, setTnc] = useState(false)
    const [auth, setAuth] = useState(false)
    const [confirmation, setConfirmation] = useState(false)
    const [rmvCnf, setRmvCnf] = useState(false)
    const [address, setAddress] = useState(null)
    const [selected, setSelected] = useState(null)
    const [qrImg, setQrImg] = useState(null)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(3)
    const [page, setPage] = useState(0)
    const [tfaCode, setTfaCode] = useState('')

    const tabs = [
        { id: "public" },
        { id: "private" },
        { id: "smart" }
    ];
    const handleMenu = e => {
        e.preventDefault();
        setIsOpen(prevState => !prevState);
        setIsEdit(false);
        setWalletEdit(false);
        setLinkCopied(false);
    };
    const handleChangeTab = useCallback((id) => setActiveTab(id), [])


    const inc = () => {
        let pages = Math.floor(metaurl.addresses.length / 3)
        if (page < pages) {
            setPage(page + 1)
            setStart(start + 3)
            setEnd(end + 3)
        }
    }

    const dec = () => {
        if (page >= 1) {
            setPage(page - 1)
            setStart(start - 3)
            setEnd(end - 3)
        }
    }

    const showTNC = () => {
        return (
            <div className="cnf-modal">
                <div className="content">
                    <div className="modal-title">
                        Terms & Conditions
                    </div>
                    <p>In publishing and graphic design, Lorem ipsum is a placeholder
                        text commonly used to demonstrate the visual form of a document or a
                        typeface without relying on meaningful content.
                        Lorem ipsum may be used as a placeholder before final copy is available.
                    </p>
                    <button onClick={() => {
                        makeAddressVerified(selected.address)
                        setTnc(false)
                    }}>
                        I understand & agree.
                    </button>
                    <p>or</p>
                    <button onClick={() => setTnc(false)}>
                        Keep pay button deactivated
                    </button>
                </div>
            </div>
        )
    }

    const showConfirmationModal = () => {
        return (
            <div className="cnf-modal">
                <div className="content">
                    <div className="modal-title">
                        You’ve Added A Wallet To This MetaURL!
                    </div>
                    <p>To activate wallet address auto-fill in MetaMask,
                        when someone taps the pay button, you need, to
                        first set up 2FA. NFTs display either way.
                    </p>

                    <img className="qr-code"
                        src={qrImg} alt="/" />
                    Scan code with your authenticator
                    <p>or</p>
                    <button onClick={() => {
                        setConfirmation(false)
                        window.location.reload()
                    }}>
                        Keep pay button deactivated
                    </button>
                </div>
            </div>
        )
    }

    const show2FAModal = () => {
        return (
            <div className="cnf-modal">
                <div className="content">
                    <div className="modal-title">
                        You’ve Added A Wallet To This MetaURL!
                    </div>
                    <p>To activate wallet address auto-fill in MetaMask,
                        when someone taps the pay button, you need, to
                        first set up 2FA. NFTs display either way.
                    </p>

                    <input placeholder="Enter 2FA code here"
                        value={tfaCode}
                        onChange={(e) => setTfaCode(e.target.value)} />
                    <button onClick={() => verifyCode(tfaCode, selected.secret)}>
                        Verify Code
                    </button>
                    <p>or</p>
                    <button onClick={() => setAuth(false)}>
                        Keep pay button deactivated
                    </button>
                </div>
            </div>
        )
    }

    const showRemoveModal = (ad) => {
        return (
            <div className="cnf-modal">
                <div className="content">
                    <div className="modal-title">
                        Are you sure to remove the wallet?
                    </div>
                    <p>
                        Please confirm to remove the wallet with address
                        : {ad}
                    </p>

                    <div className="btn-cnt">
                        <button onClick={async () => await removeAddress(ad)}>
                            Yes
                        </button>
                        <p>or</p>
                        <button onClick={() => setRmvCnf(false)}>
                            No
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const insertAddress = async (ad) => {

        setLoading(true)
        let res = await DropMagnetAPI.generateQR(ad)
        setQrImg(res.src)
        const data = {
            address: ad,
            secret: res.secret
        }
        currentUser.getIdToken().then((idToken) => {
            DropMagnetAPI.connectWalletToMetaURL(data, id, idToken)
                .then(res => {
                    setLoading(false)
                    if (res.status === 409) {
                        alert("This wallet already exists.")
                    }
                    else {
                        setConfirmation(true)
                    }
                })
        })
    }

    const verifyCode = async (code, sct) => {
        setLoading(true)

        await DropMagnetAPI.verifyCode(sct, code)
            .then(res => {
                setLoading(false)
                if (res.status === 1) {
                    setAuth(false)
                    setTnc(true)
                }
                else {
                    alert(res.message)
                }

            })

    }

    const removeAddress = async (ad) => {
        setRmvCnf(false)
        setLoading(true)
        const data = { address: ad }

        currentUser.getIdToken().then((idToken) => {
            DropMagnetAPI.removeWalletFromMetaURL(data, id, idToken)
                .then(res => {
                    setLoading(false)
                    if (res.status === 204) {
                        alert("This wallet doesn't exist.")
                    }
                    else {
                        window.location.reload()
                    }
                })
        })
    }

    const selectAddress = (ad) => {

        setLoading(true)
        const data = { address: ad }

        currentUser.getIdToken().then((idToken) => {
            DropMagnetAPI.selectWalletForMetaURL(data, id, idToken)
                .then(res => {
                    setLoading(false)
                    window.location.reload()
                })
        })
    }

    const makeAddressVerified = async (ad) => {
        setLoading(true)
        const data = { address: ad }

        currentUser.getIdToken().then((idToken) => {
            DropMagnetAPI.veridyWalletForMetaURL(data, id, idToken)
                .then(res => {
                    selectAddress(ad)
                })
        })
    }

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
                                <img src={edit} alt="edit" />
                            </LiIcon>
                            <p>Edit</p>
                        </li>
                        <li onClick={() => setLinkCopied(true)}>
                            <LiIcon>
                                <img src={link} alt="link" />
                            </LiIcon>
                            <p>{!linkCopied ? "Copy link" : "Link copied!"}</p>
                        </li>
                        <li onClick={() => {
                            setIsOpen(false);
                            setWalletEdit(true)
                        }}>
                            <LiIcon>
                                <img src={wallet} alt="wallet" />
                            </LiIcon>
                            <p>Connected Wallets</p>
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
                        <img src={check} alt="check" />
                    </Save>
                    <Title className="items-center justify-center">
                        <LiIcon>
                            <img src={edit} alt="edit" />
                        </LiIcon>
                        <p>Edit</p>
                    </Title>
                    <Form>
                        <EditName>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" value={metaurl.name} readOnly={true} />
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
                                                onClick={() => handleChangeTab(tab.id)}>
                                                {tab.id}
                                            </label>
                                            <input type="radio" id={tab.id} name="tabs"
                                                defaultChecked={tab.id.toLowerCase() === metaurl.privacy} />
                                        </React.Fragment>
                                    )
                                })
                            }
                            <span className="glider" />
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
                        <img src={check} alt="check" />
                    </Save>
                    <Title className="items-center justify-center">
                        <LiIcon>
                            <img src={edit} alt="edit" />
                        </LiIcon>
                        <p>Connected Wallets</p>
                    </Title>
                    <Form>
                        {metaurl.addresses.slice(start, end)
                            .map(wa => (
                                <Address
                                    style={{
                                        background: `${wa.selected ? '#09200087' : ''}`
                                    }}>
                                    <EditName
                                        onClick={async () => {
                                            if (!wa.verified) {
                                                setAuth(true)
                                                setSelected(wa)
                                            } else if (!wa.selected) {
                                                await selectAddress(wa.address)
                                            }
                                        }}>
                                        <input id="name"
                                            type="text"
                                            value={wa.address}
                                            readOnly={true}
                                            style={{
                                                border: `${wa.selected ? '1px solid #52FF02' : ''}`
                                            }}
                                        />
                                    </EditName>
                                    <Remove onClick={() => {
                                        setAddress(wa.address)
                                        setRmvCnf(true)
                                    }}>
                                        remove
                                    </Remove>
                                </Address>
                            ))}
                    </Form>

                    {metaurl?.addresses?.length > 0 ? <AddWallet insertAd={insertAddress}
                        increase={inc}
                        decrease={dec} />
                        : <AddWallet insertAd={insertAddress}
                            increase={inc}
                            decrease={dec}
                            wallets={0} />}
                </EditModal>
            )
        } else {
            return null
        }
    }
    const memoizedShowModals = useMemo(showModals, [showModals])


    return (
        <CardWrapper>
            {loading && <LoadingModal label="Saving changes...." />}
            {confirmation && showConfirmationModal()}
            {tnc && showTNC()}
            {rmvCnf && showRemoveModal(address)}
            {auth && show2FAModal()}
            <CardSize>
                <img src={image} alt="back" />
                <MoreBtn handleClick={handleMenu} isOpen={isOpen} />
                <NFT>{metaurl.nfts} NFTs</NFT>
                <Artist>{metaurl.url}</Artist>
                {memoizedShowModals}
            </CardSize>
        </CardWrapper>
    )
}

export default React.memo(Card)