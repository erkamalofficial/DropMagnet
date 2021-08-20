import React, {Component} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './newUserSlider.scss';
import styled from "styled-components";
import ContectGreySection from "../contectGreySection/ContectGreySection";
import CircleIcon from "../newUserContent/styled-components/icon-wrapper";
import blackDiscord from "../../assets/BlackDiscord.svg";
import discord from "../../assets/Discord.svg";
import blackTelegram from "../../assets/BlackTelegram.svg";
import telegram from "../../assets/Telegram.svg";
import blackOpenSea from "../../assets/BlackOpen Sea.svg";
import openSea from "../../assets/Open Sea.svg";
import blackRarible from "../../assets/BlackRarible.svg";
import rarible from "../../assets/Rarible.svg";
import blackInstagram from "../../assets/blackInstagram.svg";
import instagram from "../../assets/Instagram.svg";
import cat1 from "../../assets/cat1.png";
import cat2 from "../../assets/cat2.png";
import NewMusicPlayer from "../musicPlayer/newMusicPlayer";

const Content = styled.div`
   // height: 158px;
   // max-height: 158px;
   // margin: 8px 0;
   // padding-right: 16px;
   font-size: 24px;
   color: #fff;
   margin: 0 auto;
     
    .cn-disabled {
       height: 170px;
       max-width: 342px;
       margin: 0 auto;
       margin-top: 16px;
       
      .content {
       max-height: 100%;
       max-width: 100%;
       background-image: linear-gradient(rgba(0, 0, 0, 0.54),rgba(0, 0, 0, 0.54));
       padding-bottom: 16px;
       filter: blur(4px);
       border-radius: 12px;
      }
      
      .text {
        width: 342px;
        height: 90%;
        position: absolute;
        z-index: 3;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
    } 
       
   .cn {
     height: 100%;
     border: 2px solid transparent;
     max-width: 342px;
     width: 342px;
     margin: 0 auto;
     padding-top: 16px;
   }
   
`;

const SocialMediaLinks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 auto;
`;

const SlideImgItem = styled.div`
    width: 158px;
    height: 158px;
    max-width: 158px;
    overflow: hidden;
    
    img{
     width: 100%;
     height: 100%;
     object-fit: content;
    }

`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 1px;
`;

export default class InfinitiveSlider extends Component {
    componentDidMount() {
            const length = document.querySelectorAll('.slick-dots > li').length;

            const prev = document.querySelector('.slick-prev')
            const next = document.querySelector('.slick-next')

            if (this.props.editedActive) {
                document.querySelector('.slick-prev').disabled = true;

                document.querySelector('.slick-next').disabled = true;

            }

            let width = window.innerWidth

            const size = () => {
                if (width <= 768) {
                    return 3;
                }

                if (width >= 768 && width <= 1140) {
                    return 1.7;
                }
                return 1;
            }

            prev.style.left = `calc(50% - ${(length * size()) * 16}px)`
            next.style.right = `calc(50% - ${(length * size()) * 16}px)`

    }

    render() {
        const darkTheme = 0
        const arr = [
            <>
                <ContectGreySection content='My latest movie “Beautiful Blue Eyes”' styles={`${darkTheme && 'light'}`}/>
                <ContectGreySection
                    styles={`${darkTheme && 'light'}`}
                    content={<>My special merch for <span className='nft'>NFT</span> holders!</>}
                />

                <SocialMediaLinks>
                    <CircleIcon imgUrl={darkTheme ? blackDiscord : discord} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackTelegram : telegram} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackOpenSea : openSea} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackRarible : rarible} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackInstagram : instagram} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                </SocialMediaLinks>
            </>
            ,
            <>
                <Row>
                    <SlideImgItem>
                        <img src={cat1} alt=""/>
                    </SlideImgItem>
                    <SlideImgItem>
                        <img src={cat2} alt=""/>
                    </SlideImgItem>
                </Row>
            </>
            ,
            <NewMusicPlayer/>
            ,
            <>
                <ContectGreySection content='My latest movie “Beautiful Blue Eyes”' styles={`${darkTheme && 'light'}`}/>
                <ContectGreySection
                    styles={`${darkTheme && 'light'}`}
                    content={<>My special merch for <span className='nft'>NFT</span> holders!</>}
                />

                <SocialMediaLinks>
                    <CircleIcon imgUrl={darkTheme ? blackDiscord : discord} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackTelegram : telegram} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackOpenSea : openSea} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackRarible : rarible} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackInstagram : instagram} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                </SocialMediaLinks>
            </>
            ,
            <>
                <Row>
                    <SlideImgItem>
                        <img src={cat1} alt=""/>
                    </SlideImgItem>
                    <SlideImgItem>
                        <img src={cat2} alt=""/>
                    </SlideImgItem>
                </Row>
            </>
            ,
            <NewMusicPlayer/>
            ,
            <>
                <Row>
                    <SlideImgItem>
                        <img src={cat1} alt=""/>
                    </SlideImgItem>
                    <SlideImgItem>
                        <img src={cat2} alt=""/>
                    </SlideImgItem>
                </Row>
            </>
            ,
            <>
                <Row>
                    <SlideImgItem>
                        <img src={cat1} alt=""/>
                    </SlideImgItem>
                    <SlideImgItem>
                        <img src={cat2} alt=""/>
                    </SlideImgItem>
                </Row>
            </>
            ,
            <>
                <ContectGreySection content='My latest movie “Beautiful Blue Eyes”' styles={`${darkTheme && 'light'}`}/>
                <ContectGreySection
                    styles={`${darkTheme && 'light'}`}
                    content={<>My special merch for <span className='nft'>NFT</span> holders!</>}
                />

                <SocialMediaLinks>
                    <CircleIcon imgUrl={darkTheme ? blackDiscord : discord} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackTelegram : telegram} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackOpenSea : openSea} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackRarible : rarible} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackInstagram : instagram} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                </SocialMediaLinks>
            </>
            ,
            <>
                <ContectGreySection content='My latest movie “Beautiful Blue Eyes”' styles={`${darkTheme && 'light'}`}/>
                <ContectGreySection
                    styles={`${darkTheme && 'light'}`}
                    content={<>My special merch for <span className='nft'>NFT</span> holders!</>}
                />

                <SocialMediaLinks>
                    <CircleIcon imgUrl={darkTheme ? blackDiscord : discord} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackTelegram : telegram} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackOpenSea : openSea} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackRarible : rarible} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackInstagram : instagram} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                </SocialMediaLinks>
            </>
            ,
            <>
                <ContectGreySection content='My latest movie “Beautiful Blue Eyes”' styles={`${darkTheme && 'light'}`}/>
                <ContectGreySection
                    styles={`${darkTheme && 'light'}`}
                    content={<>My special merch for <span className='nft'>NFT</span> holders!</>}
                />

                <SocialMediaLinks>
                    <CircleIcon imgUrl={darkTheme ? blackDiscord : discord} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackTelegram : telegram} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackOpenSea : openSea} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackRarible : rarible} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackInstagram : instagram} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                </SocialMediaLinks>
            </>
            ,
            <NewMusicPlayer/>
            ,
            <NewMusicPlayer/>
            ,
            <>
                <Row>
                    <SlideImgItem>
                        <img src={cat1} alt=""/>
                    </SlideImgItem>
                    <SlideImgItem>
                        <img src={cat2} alt=""/>
                    </SlideImgItem>
                </Row>
            </>
            ,
            <>
                <ContectGreySection content='My latest movie “Beautiful Blue Eyes”' styles={`${darkTheme && 'light'}`}/>
                <ContectGreySection
                    styles={`${darkTheme && 'light'}`}
                    content={<>My special merch for <span className='nft'>NFT</span> holders!</>}
                />

                <SocialMediaLinks>
                    <CircleIcon imgUrl={darkTheme ? blackDiscord : discord} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackTelegram : telegram} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackOpenSea : openSea} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackRarible : rarible} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                    <CircleIcon imgUrl={darkTheme ? blackInstagram : instagram} alt={"icon"}
                                className={`${darkTheme && 'light'} social-media`}/>
                </SocialMediaLinks>
            </>
            , <NewMusicPlayer/>
        ]
        const settings = {
            dots: true,
            initialSlide: 0,
            // centerMode: true,
            infinite: true,
            slidesToShow: 1.5,
            speed: 500,
            rows: 2,
            slidesPerRow: 2,
            arrows: true,
            // variableWidth: true,
            className: this.props.editedActive && "slider",
            swipe: this.props.editedActive ? false : true,
            touchMove: this.props.editedActive ? false : true,

            responsive: [
                {
                    breakpoint: 1140,
                    settings: {
                        slidesToShow: 1,
                        slidesPerRow: 1,
                        arrows: true,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        rows: 1,
                        slidesPerRow: 1,
                        arrows: true,
                        infinite: false
                    }
                }
            ],



        };
        // console.log(this.props.setFeaturedContentModal)
        return (
            <div className='slider-container' onClick={() => this.props.editedActive && this.props.setFeaturedContentModal(true)}>
                <Slider {...settings}>
                    {arr.map((i, index) => {
                        return (
                            <Content key={i}>
                                {
                                    !this.props.editedActive
                                      ? <div className='cn'>{i}</div>
                                      : <div className='cn-disabled'>
                                         <div className='text'>Edit Featured Content</div>
                                         <div className='content'>{arr[0]}</div>
                                        </div>
                                }
                            </Content>
                        )
                    })}
                </Slider>
            </div>
        );
    }
}
