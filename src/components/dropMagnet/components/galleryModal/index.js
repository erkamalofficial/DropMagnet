import Modal from 'react-modal';
import React, {useCallback, useState} from "react";
import "./galleryModal.scss";
import styled from "styled-components";
import close from "../../assets/close.svg";
import menu from "../../assets/menu.svg";
import message from  "../../assets/message.svg";
import share from  "../../assets/share2.svg";
import blockChain from  "../../assets/blockchain.svg";
import image from  "../../assets/image source.svg";
// import FileMenu from "../../../myGallery/fileMenu/fileMenu";
// import chat from "../../assets/chat.svg";
import CircleIcon from "../newUserContent/styled-components/icon-wrapper";
import LikeButton from "../newUserContent/styled-components/likeButton";
// import userLogo from "../../assets/profile.svg";
// import PageLiksComponent from "../pageLiks/PageLiks";

Modal.setAppElement('#portal');

const Header = styled.div`
   background-color: #444444;
   padding: 12px 10px 24px 10px;
`;

const HeaderContent = styled.div`
  display: flex;
  padding: 10px;
`;

const HeaderTitle = styled.div`
    width:fit-content;
    max-width: 200px;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 6px;
    background-color: transparent;
    color: #eaeaea;
    font-size: 22px;
    font-weight: 500;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    @media(max-width: 520px){
        font-size: 20px;
    }
`;

const Close = styled.button`
    position:absolute;
    top:32px;
    left:32px;
    width: 42px;
    height: 42px;
    background-color: #000;
    border-radius: 100px;
    cursor:pointer;
    border:none;
    outline:none;
    display: flex;
    align-items: center;
    justify-content: center;
     @media(max-width: 520px){
      position: relative;
      top: 0;
      left: 10px;
      margin-bottom: 10px;
     }
     img{
        width:18px;
        height:18px
     }
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -6px;
    margin-right: -6px;
    flex-wrap: wrap;
    background-color: #444444;
    
    &.active-tab {
     margin-top: -5px;
    }
    
`;
//
// const BoxWrap = styled.div`
//     padding-left: 6px;
//     padding-right: 6px;
// ;`
//
// const Box = styled.div`
//     width: 213px;
//     height: auto;
//     border-radius: 6px;
//     background-color: #ffffff;
//     font-size: 14px;
//     font-weight: 500;
//     font-style: normal;
//     letter-spacing: normal;
//     line-height: normal;
//     text-align: left;
//     font-style: normal;
//     letter-spacing: normal;
//     line-height: normal;
//     color: #000000;
//     padding: 7px 12px;
//     text-overflow: ellipsis;
//     overflow: hidden;
//     white-space: nowrap;
//     margin-bottom: 6px;
//     &.small-box{
//         width: 161px;
//     }
// `;
const Tabs = styled.div`
    // margin: 32px 0;
    
    textarea {
      max-width: 322px;
      background: none;
      border: none;
      outline: none;
      resize: none;
      color: #EAEAEA;
      font-size: 16px;
      border: none;
      scrollbar-width: none;
      width: 100%;
      overflow-y: auto;
      box-sizing:border-box;
      font-size: 18px;
      font-weight: 400;
      outline:none !important;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
`;
const TabsHeader = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
   
    .edit-tabs{
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        width: fit-content;
        label{
          display: flex;
          text-transform: capitalize;
          align-items: center;
          justify-content: center;
          width: 163px;
          height: 46px;
          border-radius: 100px;
          background-color: transparent;
          cursor: pointer;
          z-index: 2;
          color: #EAEAEA;
          margin: 0 3.5px;
          font-size: 18px;
          font-weight: 500;
          font-style: normal;
          letter-spacing: normal;
          line-height: normal;
          text-align: left;
          font-style: normal;
          letter-spacing: normal;
          line-height: normal;
          @media(max-width: 420px){
            width: 140px;
            height: 36px;
          }
          @media(max-width: 370px){
            width: 125px;
          }
        }
        input[type="radio"] {
          display: none;
        }
        input[id="1"] {
          &:checked {
            & ~ .glider {
              transform: translateX(0);
            }
          }
        }
        input[id="2"] {
          &:checked {
            & ~ .glider {
              transform: translateX(calc(100% + 7px));
            }
          }
        }
        .glider {
          position: absolute;
          display: flex;
          left: 0;
          align-items: center;
          justify-content: center;
          width: 163px;
          height: 46px;
          border-radius: 100px;
          background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
          border: 0.75px solid #000000;
          cursor: pointer;
          margin: 0 3.5px;
          z-index:1;
          transition: 0.25s ease-out;
           @media(max-width: 420px){
            width: 140px;
            height: 36px;
          }
          @media(max-width: 370px){
            width: 125px;
          }
        }
    }
`;
const TabContent = styled.div`
    // margin-top:32px;
    background-color: #000000;
    @media(max-width: 530px) {
      height: 235px;
    }
    
    .content {
      max-width: 342px;
      display: flex;
    }
    
`;
// const Textarea = styled.textarea`
//     width: 100%;
//     overflow-y: auto;
//     resize: none;
//     border: none;
//     outline: none !important;
//     // border-radius: 6px;
//     background-color: #000000;
//     padding: 14px 17px;
//     box-sizing:border-box;
//     font-size: 18px;
//     color: #eaeaea;
//     font-weight: 400;
//     font-style: normal;
//     letter-spacing: normal;
//     line-height: normal;
//     text-align: left;
//     font-style: normal;
//     letter-spacing: normal;
//     line-height: normal;
//     outline:none !important;
//
//     &.active {
//       font-size: 16px;
//     }
//
//     @media(max-width: 520px){
//     // padding:20px;
//     font-size: 20px;
//     }
// `;

const CollectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width:fit-content;
    border-radius: 6px;
    font-size: 24px;
    padding: 32px 46px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: left;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    cursor:pointer;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    @media(max-width: 520px){
        font-size: 20px;
    }
`;
const Collect = styled.div`
    display: flex;
    background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
    border: 0.75px solid #000000;
    justify-content: center;
    padding: 12px 0;
    width: 100%;
    border-radius: 7px;
    color: #fff;
    margin-top: 32px;
    max-width: 322px;
    img{
        width: 14px;
        height: 14px;
        margin: 5px 0 0 4px;
    }
`;
// const Line = styled.div`
//     width: 1.5px;
//     height: 21px;
//     background: #1d1d1d;
//     border-radius: 100px;
//     margin-right: 8px;
// `;

const IconsWrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 322px;
`;

const TabsWrapper = styled.div`
    padding: 12px 7px;
    background-color: #232323;
    border: 1px solid #232323;
    
    .content {
      display: flex;
      justify-content: space-between;
      max-width: 322px;
      margin: 0 auto;    
    }
`;

const Tab = styled.div`
    border-radius: 11px;
    color: #EAEAEA;
    font-size: 18px;
    font-weight: 500;
    background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
    border: 0.75px solid #000000;
    width: calc(100% / 4 - 4px);
    height: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const GalleryModal = ({isOpen, closeModal}) => {
    const tabsInfo = [
        {
            id: 1,
            tab: "Description",
            content: "This artwork is a beautiful mix of hand drawn illustration, AI neural compositing, trained from hours of custom artist-made iterations, projected on a mesh of a whale."
        },
        {
            id: 2,
            tab: "Provenance",
            content: "TestMinted on X date by Y owner and listed for Z Ξ \n Sold on X date to Y owner for Z Ξ"
        },
    ];
    const [activeTab, setActiveTab] = useState(tabsInfo[0].id);
    const handleChangeTab = useCallback((id) => setActiveTab(id), []);
    const handleChange = (value) => {

    }
    //
    // const scrollToCover = () => {
    //     props.coverPageRef.current.scrollIntoView();
    //     // setActiveTab(1)
    // };
    // const scrollToGallery = () => {
    //     props.galleryRef.current.scrollIntoView();
    //     // setActiveTab(2)
    // };

    return (
            <Modal
                closeTimeoutMS={200}
                isOpen={isOpen}
                onRequestClose={closeModal}
                className={`gallery-Modal`}
            >
                <div className="gallery-modal-content">
                    <Header>
                        <HeaderContent>
                            <Close onClick={closeModal}><img src={close} alt="close"/></Close>
                            <HeaderTitle>[Title] by [Artist name]</HeaderTitle>
                        </HeaderContent>
                        <TabsHeader>
                            <div className="edit-tabs">
                                {
                                    tabsInfo.map(element => {
                                        return (
                                            <React.Fragment key={element.id}>
                                                <label htmlFor={element.id}
                                                       onClick={() => handleChangeTab(element.id)}
                                                >
                                                    {element.tab}
                                                </label>
                                                <input type="radio" id={element.id} name="tabs"
                                                       defaultChecked={element.id === activeTab}/>
                                            </React.Fragment>
                                        )
                                    })
                                }
                                <span className="glider"/>
                            </div>
                        </TabsHeader>
                    </Header>
                    <Tabs>
                        <TabContent>
                            <textarea style={{minHeight: activeTab !== 1 ? '235px' : '176px'}} name="text" value={tabsInfo[activeTab-1].content} className={`${activeTab === 2 ? 'active' : ''}`} onChange={(e) => handleChange(e.target.value)}/>

                            {activeTab === 1
                                ? <TabsWrapper>
                                    <div className='content'>
                                        <Tab>Trait 1</Tab>
                                        <Tab>Trait 2</Tab>
                                        <Tab>Trait 3</Tab>
                                        <Tab>Trait 4</Tab>
                                    </div>
                                </TabsWrapper>

                                : null
                            }
                        </TabContent>
                    </Tabs>
                    <Footer>
                        <CollectWrapper>
                            <IconsWrap>
                                <LikeButton modalIcons='modal-icons'/>
                                <CircleIcon imgUrl={message} alt={"icon"} className='modal-icons'/>
                                <CircleIcon imgUrl={share} alt={"icon"} className='modal-icons'/>
                                <CircleIcon imgUrl={blockChain} alt={"icon"} className='modal-icons'/>
                                <CircleIcon imgUrl={image} alt={"icon"} className='modal-icons'/>
                            </IconsWrap>

                            <Collect>
                                { activeTab === 1
                                    ? <>
                                        <div>Collect for 72</div>
                                        <img src={menu} alt="" className='col-img'/>
                                        {/*<Line/>*/}
                                      </>
                                    : <div>
                                        View on Marketplace
                                    </div>
                                }
                            </Collect>
                        </CollectWrapper>

                        {/*<BoxWrap>*/}
                        {/*    <Box>View Contract On Etherscan</Box>*/}
                        {/*</BoxWrap>*/}
                        {/*<BoxWrap>*/}
                        {/*    <Box className="small-box">View Content Source</Box>*/}
                        {/*</BoxWrap>*/}
                        {/*<BoxWrap>*/}
                        {/*    <Box className="small-box">Token ID: 88557894…</Box>*/}
                        {/*</BoxWrap>*/}
                        {/*<BoxWrap>*/}
                        {/*    <Box>Contract Address: 88557894…</Box>*/}
                        {/*</BoxWrap>*/}
                    </Footer>
                </div>
            </Modal>
    )
}

export default GalleryModal