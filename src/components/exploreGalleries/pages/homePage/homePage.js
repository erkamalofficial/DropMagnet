import React, { useEffect, useState } from "react";
import chat from "../../assets/chat.svg";
import notification from "../../assets/notification.svg";
import { Container } from "../../styled-components/Container";
import { InsetBox } from "../../styled-components/InsetBox";
import { InsetBoxIcon } from "../../styled-components/InsetBoxIcon";
import { Row } from "../../styled-components/Row";
// import SwitchToggle from "../../styled-components/SwitchToggle";
import { CardsWrapper } from "../../styled-components/CardsWrapper";
import Card from "../../styled-components/Card";
import glass from "../../assets/glass.svg";
import diamond from "../../assets/diamond.svg";
import partEmoji from "../../assets/emoji.svg";
import frame from "../../assets/frame.svg";
// import WalletCollection from "../../styled-components/WalletCollection";
// import {Link} from "../../styled-components/NavLink";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import "./feeds.css"
import d from "../../assets/sampleFeed.jpg"
import { useAuth } from "../../../../contexts/FirebaseAuthContext";

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

    const user = JSON.parse(localStorage.getItem('userDetails'))

    const [verified, setVerified] = useState(false)
    const { currentUser } = useAuth()

    const feeds = [
        'https://99designs-blog.imgix.net/blog/wp-content/uploads/2021/05/merlin_184196631_939fb22d-b909-4205-99d9-b464fb961d32-superJumbo.jpeg?auto=format&q=60&fit=max&w=930',
        'https://miro.medium.com/max/1200/1*XVCw5JGYeHX_dj15uEv9Vw.jpeg',
        'https://cdn.domestika.org/c_fit,dpr_auto,f_auto,t_base_params,w_820/v1619180336/content-items/007/751/585/foto1-original.jpeg?1619180336',
        'https://static.stambol.com/wordpress/wp-content/uploads/2021/05/cryptoart-nft-redefining-real-683x1024.jpg',
        'https://cdn.i-scmp.com/sites/default/files/d8/images/methode/2021/03/12/e7e1447c-8288-11eb-87b1-2ad3cd5fba10_image_hires_080000.jpg'
    ]

    const checkIfVerified = async () => {
        try {
            const r = await currentUser.getIdTokenResult()
            const is_verified = r.claims["verified"]
            setVerified(is_verified)
        } catch (error) {
            setVerified(false);
        }

    }

    useEffect(() => {
        checkIfVerified()
    }, [])

    return (
        <Container>
            {/* <Border><div></div></Border> */}
            <InsetBox>
                <Row className="items-center justify-between mx-auto max-w-324">
                    <InsetBoxIcon>
                        <img src={chat} alt="icon" />
                        <p className="left-top-tooltip">9+</p>
                    </InsetBoxIcon>
                    {/*<SwitchToggle/>*/}

                    {!user ? (
                        <div className="stripe medium-stripe"></div>
                    ) : (
                        <div className="greeting-Alexander">
                            Greetings, {user.name?.split(' ')[0]}
                        </div>
                    )}
                    <InsetBoxIcon>
                        <img src={notification} alt="icon" />
                        <p className="right-top-tooltip">9+</p>
                    </InsetBoxIcon>
                </Row>
            </InsetBox>
            <div className="flex-content">
                <CardsWrapper>
                    <div className="first-row">
                        <Link to="/my-gallery">
                            <Card title="Rooms" icon={'🥳'} />
                        </Link>
                        <Link to="/my-gallery">
                            <Card title="Explore" icon={'🚀'} />
                        </Link>
                        <Link to="/my-gallery">
                            <Card title="Meta URLs" icon={'🔗'} />
                        </Link>
                    </div>
                    <div className="second-row">
                        {verified ?
                            <Link to="/create_drop">
                                <Card title="Schedule Drop" icon={'💎'} />
                            </Link>
                            : <Link to="/home">
                                <Card title="Apply As An Artist" icon={'🎨'} />
                            </Link>}

                        <Link to="/swiper">
                            <Card title="Drop Swipe" icon={'👓'} />
                        </Link>
                        <Link to="/settings">
                            <Card title="Settings" icon={'⚙️'} />
                        </Link>
                    </div>

                </CardsWrapper>
            </div>

            <div className="mx-auto max-w-564">
                <div className="feed">Feed</div>
                <div className="feed-container">
                    {feeds.map(f => (
                        <div className="feed-item"
                            style={{
                                backgroundImage: `url(${f})`
                            }}>
                            <div className="nfts mb-view">
                                72 NFTS
                            </div>
                            <div className="feed-details">
                                <div className="meta-url">
                                    Collector.link/CryptoArtMan
                                </div>
                                <div className="nfts">
                                    72 NFTS
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/*<WalletCollection/>*/}
        </Container>
    )
}

export default HomePage