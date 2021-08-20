import React, {useEffect, useRef} from "react";

import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

import SwiperCore, {
    Pagination,
    Navigation
} from 'swiper/core';

import ContectGreySection from "../contectGreySection/ContectGreySection";
import CircleIcon from "../newUserContent/styled-components/icon-wrapper";
import NewMusicPlayer from "../musicPlayer/newMusicPlayer";
import arrow from "../../assets/arrows.svg";
import discord from "../../assets/Discord.svg";
import telegram from "../../assets/Telegram.svg";
import openSea from "../../assets/Open Sea.svg";
import rarible from "../../assets/Rarible.svg";
import instagram from "../../assets/Instagram.svg";
import blackDiscord from "../../assets/BlackDiscord.svg";
import blackTelegram from "../../assets/BlackTelegram.svg";
import blackOpenSea from "../../assets/BlackOpen Sea.svg";
import blackRarible from "../../assets/BlackRarible.svg";
import blackInstagram from "../../assets/blackInstagram.svg";
import styled from "styled-components";
import cat1 from "../../assets/cat1.png";
import cat2 from "../../assets/cat2.png";
import './newUserSlider.scss';

SwiperCore.use([Pagination, Navigation]);

const SlideImgItem = styled.div`
    width: 158px;
    height: 158px;
    img {
     width: 100%;
     height: 100%;
     object-fit: content;
    }

    // @media(max-width: 440px){
    //   width: 146px;
    //   height: 146px;
    // }
    //
    // @media(max-width: 360px){
    //   width: 140px;
    //   height: 140px;
    // }
`;

const SliderWrapp = styled.div`
    max-width: 342px;
    margin: 0 auto;
    margin-top: 16px; 
    // border: 1px solid #fff;
        
    @media (max-width: 370px) {
       margin: 16px 8px; 
    }
`;

const SocialMediaLinks = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SliderPrev = styled.div`
     width: 8px;
     height:14px;
     background-image: url(${arrow});
     // opacity:0.1;
     transform: rotate(180deg);
     position: absolute;
     left: calc(50% - 60px);
     z-index:10;
     cursor: pointer;
     bottom: -39px;
          
     @media (min-width: 1400px) {
       left: calc(50% - 62px);
       bottom: 3px;
     }
     
     @media (max-height: 633px) {
       left: calc(50% - 60px);
       bottom: -29px;
     }
`;
const SliderNext = styled.div`
     width: 8px;
     height:14px;
     background-image: url(${arrow});
     // opacity:0.1;
     position: absolute;
     right: calc(50% - 60px);
     z-index:10;
     cursor: pointer;
     bottom: -39px;
     
     @media (min-width: 1400px) {
       right: calc(50% - 62px);
       bottom: 3px;
     }
     
     @media (max-height: 633px) {
       right: calc(50% - 60px);
       bottom: -29px;
     }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapp = styled.div`
  position: relative;
  
  div {
      &.edited-text {
        position: absolute;
        right: 0;
        left: 0;
        margin: 0 auto;
        max-width: 342px;
        height: 100%;
        z-index: 100;
        margin-top: 8px;
        border-radius: 12px;
        background-image: linear-gradient(rgba(0, 0, 0, 0.54) 0%, rgba(0, 0, 0, 0.54) 100%);
        backdrop-filter: blur(4px);
        color: #EAEAEA;
        font-size: 24px;
        font-weight: 400;

        ::after {
        content: "Edit Featured Content";
       }
      }

      &.edited-text-active {
        display: flex;
        justify-content: center;
        align-items: center;
      }  
    }
`;
const MobileSlider = ({darkTheme, editedActive, setFeaturedContentModal, featuredContentModal, userDescription, imageUpdateModalToggle}) => {
    const pagination = {
        "clickable": true,
        "renderBullet": (index, className) => {
            return '<span class=' + className + '> </span>';
        }
    }

    const slidero = useRef(null)

    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)

    const handleChangeSlideToFirst = () => {
        const slideCurrentSize = slidero.current.childNodes[1].children[1].style.width.replace(/px/i, '')
        // console.log(document.querySelectorAll('.swiper-pagination .swiper-pagination-bullet')[0])
        const bullets = document.querySelectorAll('.swiper-pagination .swiper-pagination-bullet')

        for (let i = 0; i < bullets.length; i++ ) {

        }
        // console.log(document.querySelector('.swiper-wrapper .swiper-slide[data-swiper-slide-index="0"]').style.background)
        slidero.current.childNodes[1].children[1].classList.add('swiper-slide-active')
        document.querySelector('.swiper-wrapper').style.transform = `translate3d(-${slideCurrentSize}px,0,0)`
        slidero.current.childNodes[1].style.transform = `translate3d(-${slideCurrentSize}px,0,0)`
        // slidero.current.childNodes[1].style.transitionDuration = "1s"
    }

    useEffect(() => {
        handleChangeSlideToFirst()
    }, [editedActive, featuredContentModal, userDescription, imageUpdateModalToggle])

    return (

        <Wrapp>
            <div className={`${editedActive}`} onClick={(e) => setFeaturedContentModal(true)}/>

            <div className='mobile-swiper' style={{pointerEvents: editedActive && 'none'}}>
                <Swiper
                    ref={slidero}
                    slidesPerView={1}
                    slidesPerColumn={1}
                    grabCursor={true}
                    loop={true}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    pagination={pagination}
                    className="userSwiper"
                    onSwiper={() => 0}
                >
                    <SliderPrev ref={navigationPrevRef}/>
                    <div>
                        <SwiperSlide key={1}>
                            <SliderWrapp>

                                <ContectGreySection content='My latest movie “Beautiful Blue Eyes”'
                                                    styles={`${darkTheme && 'light'}`}/>
                                <ContectGreySection
                                    styles={`${darkTheme && 'light'}`}
                                    content={<>My special merch for <span
                                        className='nft'>NFT</span> holders!</>}
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
                            </SliderWrapp>
                        </SwiperSlide>

                        <SwiperSlide key={2}>
                            <SliderWrapp>
                                <Row>
                                    <SlideImgItem>
                                        <img src={cat1} alt=""/>
                                    </SlideImgItem>
                                    <SlideImgItem>
                                        <img src={cat2} alt=""/>
                                    </SlideImgItem>
                                </Row>
                            </SliderWrapp>
                        </SwiperSlide>
                        <SwiperSlide key={3}>
                            <SliderWrapp>
                                <NewMusicPlayer/>
                            </SliderWrapp>
                        </SwiperSlide>
                        <SwiperSlide key={4}>
                            <SliderWrapp>
                                <Row>
                                    <SlideImgItem>
                                        <img src={cat1} alt=""/>
                                    </SlideImgItem>
                                    <SlideImgItem>
                                        <img src={cat2} alt=""/>
                                    </SlideImgItem>
                                </Row>
                            </SliderWrapp>
                        </SwiperSlide>
                        <SwiperSlide key={5}>
                            <SliderWrapp>
                                <NewMusicPlayer/>
                            </SliderWrapp>
                        </SwiperSlide>
                        <SwiperSlide key={6}>
                            <SliderWrapp>
                                <Row>
                                    <SlideImgItem>
                                        <img src={cat1} alt=""/>
                                    </SlideImgItem>
                                    <SlideImgItem>
                                        <img src={cat2} alt=""/>
                                    </SlideImgItem>
                                </Row>
                            </SliderWrapp>
                        </SwiperSlide>

                    </div>
                    <SliderNext ref={navigationNextRef}/>
                </Swiper>
            </div>
        </Wrapp>

    )
}

export default MobileSlider;