import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {EffectCoverflow,Autoplay, Mousewheel} from 'swiper/core';
import "swiper/swiper.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "../../slider.scss";
import styled from "styled-components";
import ArtGalleryCard from "../../components/card/card";



SwiperCore.use([EffectCoverflow,Autoplay, Mousewheel]);
const imgUrls = [
    {id:1, url: "https://swiperjs.com/demos/images/nature-1.jpg"},
    {id:2, url: "https://swiperjs.com/demos/images/nature-2.jpg"},
    {id:3, url: "https://swiperjs.com/demos/images/nature-3.jpg"},
    {id:4, url: "https://swiperjs.com/demos/images/nature-4.jpg"},
    {id:5, url: "https://swiperjs.com/demos/images/nature-5.jpg"},
    {id:6, url: "https://swiperjs.com/demos/images/nature-6.jpg"},
    {id:7, url: "https://swiperjs.com/demos/images/nature-7.jpg"},
    {id:8, url: "https://swiperjs.com/demos/images/nature-8.jpg"},
    {id:9, url: "https://swiperjs.com/demos/images/nature-9.jpg"}
];

const SwiperSlider = styled.div`
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    .mySwiper{
      display:none;
      @media(max-width: 429px){
        display: block;
      }
    }
    .mySwiper-desktop{
      display:block;
       @media(max-width: 429px){
         display:none;
       }
    }
    .slide-item{
        padding: 0 10px;
        filter: blur(0);
        .swiper-slide-shadow-left{
            background: none;
        }
        .swiper-slide-shadow-right{
            background: none;
        }
        &.swiper-slide-active{
        filter: blur(0);
        }
        &.swiper-slide-prev{
        filter: blur(0);
        }
        &.swiper-slide-next{
        filter: blur(0);
        }
        @media(max-width: 429){
        filter: blur(10px);
        .swiper-slide-shadow-left{
            background: none;
        }
        .swiper-slide-shadow-right{
            background: none;
        }
        &.swiper-slide-active{
        filter: blur(0);
        }
        &.swiper-slide-prev{
        filter: blur(0);
        }
        &.swiper-slide-next{
        filter: blur(0);
        }
        }
    }
`;
const SliderWrapper = styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
`;
const Overlay = styled.div`
    position: absolute;
    max-width: 510px;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: rgba(26, 26, 26, 0.8);
    box-shadow: 0 0 5px 10px rgba(26, 26, 26, 0.7);
    filter: blur(10px) drop-shadow(-4px 4px 10px #151414);
    &.overlay_left{
    top:0;
    left: 0;
    }
    &.overlay_right{
    top:0;
    right: 0;
    }
    @media(min-width: 429px){
    display:none;
    }
    
`;



const Slider = () => {
    // const [size, setSize] = useState(window.innerWidth-991);
    const [size, setSize] = useState(0);

    const resizeWindow = () => {
        if(window.innerWidth > 429){
            setSize(window.innerWidth - 429)
        }else{
            setSize(0)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", resizeWindow)
        return window.removeEventListener('resize', resizeWindow)
    },[size]);

    return (
        <SliderWrapper>
            <Overlay className="overlay_left" style={{width: `${size}px`}}/>
            <SwiperSlider>
                <Swiper
                    className={"mySwiper"}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    mousewheel={false}
                    loop={true}
                    spaceBetween={0}
                    autoplay={{
                        "delay": 2500,
                        "disableOnInteraction": false
                    }}
                    coverflowEffect={{
                        "rotate": 50,
                        "stretch": 0,
                        "depth": 100,
                        "modifier": 1
                    }}
                >
                    {
                        imgUrls.map(img => {
                            return (
                                <SwiperSlide key={img.id} className="slide-item">
                                    <ArtGalleryCard className="slider-item"/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <Swiper
                    className={"mySwiper-desktop"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    mousewheel={true}
                    loop={true}
                    spaceBetween={12}
                >
                    {
                        imgUrls.map(img => {
                            return (
                                <SwiperSlide key={img.id} className="slide-item">
                                    <ArtGalleryCard className="slider-item"/>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </SwiperSlider>
            <Overlay className="overlay_right" style={{width: `${size}px`}}/>
        </SliderWrapper>
    )
}

export default Slider