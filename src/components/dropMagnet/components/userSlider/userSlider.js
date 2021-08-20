import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation} from 'swiper/core';
import styled from "styled-components";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css"
import "./userSlider.scss";
import {Row} from "../../styled-component/row";
import StyledButton from "../../styled-component/button";
import cat1 from "../../assets/cat1.png";
import cat2 from "../../assets/cat2.png";
import MusicPlayer from "../musicPlayer/musicPlayer";

SwiperCore.use([Navigation]);

const Slide1Items = [
    {id: 1, borderColor: "#ff9400", value: "Rarible"},
    {id: 2, borderColor: "#00b8ff", value: "OpenSea"},
    {id: 3, borderColor: "#ff5f00", value: "Instagram"},
    {id: 4, borderColor: "#00f1ff", value: "Twitter"},
    {id: 5, borderColor: "#afafaf", value: "Clubhouse"},
    {id: 6, borderColor: "#36b2f0", value: "Telegram"},
];

const SliderWrapper = styled.div`
     max-width: 1200px;
     width: 100%;
     margin: 0 auto;
     height: fit-content;
     overflow: hidden;
     position: relative;
     @media(max-width:500px){
      padding: 0 32px;
     }
      @media(max-width:425px){
      padding: 0 10px;
     }
`;
const SlideImgItem = styled.div`
    width: 143px;
    height: 143px;
    border-radius: 6px;
    overflow: hidden;
    margin: 0 14.5px;
    img{
    width: 100%;
    height: 100%;
    object-fit: content;
    }
    @media(max-width: 380px){
        width: 40%;
        height: 40%;
        margin: 0 10px;
    }
`;


const UserSlider = () => {
    return (
        <SliderWrapper>
            <Swiper
                slidesPerView={1}
                centeredSlides={true}
                navigation={true}
                className="userSwiper"
                spaceBetween={30}
            >
                <SwiperSlide className="slide-item">
                    <Row className="items-center justify-center flex-wrap slider-padding">
                        {
                            Slide1Items.map(button => {
                                return (
                                    <StyledButton key={button.id} borderColor={button.borderColor}>
                                        {button.value}
                                    </StyledButton>
                                )
                            })
                        }
                    </Row>
                </SwiperSlide>
                <SwiperSlide className="slide-item">
                    <Row className="items-center justify-center flex-wrap">
                        <SlideImgItem>
                            <img src={cat1} alt=""/>
                        </SlideImgItem>
                        <SlideImgItem>
                            <img src={cat2} alt=""/>
                        </SlideImgItem>
                    </Row>
                </SwiperSlide>
                <SwiperSlide className="slide-item">
                    <MusicPlayer/>
                </SwiperSlide>
            </Swiper>
        </SliderWrapper>
    )
}

export default UserSlider