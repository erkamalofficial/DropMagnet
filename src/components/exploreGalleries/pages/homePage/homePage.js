import React from "react";
import chat from "../../assets/chat.svg";
import notification from "../../assets/notification.svg";
import {Container} from "../../styled-components/Container";
import {InsetBox} from "../../styled-components/InsetBox";
import {InsetBoxIcon} from "../../styled-components/InsetBoxIcon";
import {Row} from "../../styled-components/Row";
// import SwitchToggle from "../../styled-components/SwitchToggle";
import {CardsWrapper} from "../../styled-components/CardsWrapper";
import Card from "../../styled-components/Card";
import glass from "../../assets/glass.svg";
import diamond from "../../assets/diamond.svg";
import partEmoji from "../../assets/emoji.svg";
import frame from "../../assets/frame.svg";
// import WalletCollection from "../../styled-components/WalletCollection";
// import {Link} from "../../styled-components/NavLink";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const Link = styled(NavLink)`
    width: 100%;
  // box-shadow: 0 0 2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 -1px 3px rgba(0, 0, 0, 0.5), inset 0 -3px 0 rgba(37, 37, 37, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.5);
  // border-radius: 19px;
  // background-image: linear-gradient(180deg, rgba(24, 24, 24, 0.83) 0%, rgba(19, 19, 19, 0.83) 100%);
  // color: #d8d8d8;
  font-size: 16px;
  text-decoration: none;
  // padding: 6px 12px 10px;
`

const Border = styled.div`
    background-color: #1a1a1a;
    margin-top: -1px;
    position: absolute;
    height: 20px;
    width: 100%;
    clip-path: polygon(0 0, 100% 0, 100% 1px, calc(50% + 187px) 1px, 50% 20px, calc(50% - 187px) 1px, 0 1px);
    div {
        background-color: black;
        height: 100%;
        clip-path: polygon(0 0, calc(50% - 187px) 0, 50% 19px, calc(50% + 187px) 0, 100% 0, 100% 1px, calc(50% + 187px) 1px, 50% 20px, calc(50% - 187px) 1px, 0 1px)
    }
`


const HomePage = () => {
    return (
        <Container>
            <Border><div></div></Border>
            <InsetBox>
                <Row className="items-center justify-between mx-auto max-w-324">
                    <InsetBoxIcon>
                        <img src={chat} alt="icon"/>
                        <p className="left-top-tooltip">9+</p>
                    </InsetBoxIcon>
                    {/*<SwitchToggle/>*/}
                    <div className="greeting-Alexander">Greetings, Alexander</div>
                    <InsetBoxIcon>
                        <img src={notification} alt="icon"/>
                        <p className="right-top-tooltip">9+</p>
                    </InsetBoxIcon>
                </Row>
            </InsetBox>
            <div className="flex-content">
                <CardsWrapper>


                    <Link to="/my-gallery">
                        <Card title="Rooms" img={partEmoji}/>
                    </Link>
                    <Link to="/explore-galleries/connected-wallets">
                        <Card title="My Wallets" img={diamond}/>
                    </Link>
                    <Card title="Explore Galleries" img={frame}/>

                    <Card title="Drop Swipe" img={diamond}/>
                    <Card title="My SmartURLs" img={frame}/>

                    <Link to="/drop-magnet/artgallery.link/verticaly">
                        <Card title="Schedule Drop" img={glass}/>
                    </Link>
                </CardsWrapper>
            </div>

            <div className="mx-auto max-w-564">
                <div className="feed">Feed</div>
                <div className="grid-content">
                    <div className="grid-item"> </div>
                    <div className="grid-item"> </div>
                    <div className="grid-item"> </div>
                    <div className="grid-item"> </div>
                </div>
            </div>


            {/*<WalletCollection/>*/}
        </Container>
    )
}

export default HomePage