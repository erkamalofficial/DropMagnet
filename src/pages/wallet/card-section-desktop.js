import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from "swiper/core";

// install Swiper modules
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import LinksBtn from '../../components/blocks/links-btn';

SwiperCore.use([Navigation]);

const SwiperWrapper = styled.div`
  display: flex;
  width: 850px;
  margin: auto;
  .swiper-container {
    width: 100%;
    height: 100%;
    padding-top: 40px !important;
    padding-bottom: 40px !important;
  }
`;
const CardSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('./links-card.png');
    background-size: 110% 110%;
    box-shadow: 0px 4px 1px 0px rgb(0 0 0 / 83%);
    border-radius: 10px;
    padding: 0 18px 0.6rem;
    gap: 0.6rem;
    opacity: 0.8;
`;
const Circle = styled.div`
    width: 72px;
    height: 72px;
    border-radius: 50%;
    text-align: center;
    font-size: var(--font-size-3xl);

    color: white;
    margin-bottom: -24px;
    z-index: 1;
    transform: translateY(-50%);
    line-height: 72px;
    background-color: var(--darkBlue);
    border: 3px solid var(--purple500);
`;
const PLLinksBtn = styled(LinksBtn) `
    background: var(--grey800);
    font-weight: 700;
    min-width: 310px;
    text-align: center;
    .tagLink {
        color: var(--grayWhite);
    }
    .tagYou {
        color: var(--purple400);
    }
`;
const HeaderSubtitle = styled.div`
    font-size: var(--font-size-xl);
    margin-bottom: 16px;
    font-weight: 700;

`;
const CardSectionDesktop = ({ displayName }) => (

    <SwiperWrapper>
        <Swiper
            slidesPerView={2} navigation={true} className="mySwiper" freeMode={true} >
            <SwiperSlide>
                <CardSection>
                    <Circle>🎨</Circle>
                    <HeaderSubtitle>Artists</HeaderSubtitle>
                    <PLLinksBtn galleryName={displayName} />
                    <PLLinksBtn galleryName={displayName} />
                    <PLLinksBtn galleryName={displayName} />
                </CardSection>
            </SwiperSlide>
            <SwiperSlide>
                <CardSection>
                    <Circle>🌕</Circle>
                    <HeaderSubtitle>Collectors</HeaderSubtitle>
                    <PLLinksBtn galleryName={displayName} />
                    <PLLinksBtn galleryName={displayName} />
                    <PLLinksBtn galleryName={displayName} />
                </CardSection>
            </SwiperSlide>
            <SwiperSlide>
                <CardSection>
                    <Circle>🧥</Circle>
                    <HeaderSubtitle>Music</HeaderSubtitle>
                    <PLLinksBtn galleryName={displayName} />
                    <PLLinksBtn galleryName={displayName} />
                    <PLLinksBtn galleryName={displayName} />
                </CardSection>
            </SwiperSlide>
            <SwiperSlide>
                <CardSection>
                    <Circle>🎭</Circle>
                    <HeaderSubtitle>Fashion</HeaderSubtitle>
                    <PLLinksBtn galleryName={displayName} />
                    <PLLinksBtn galleryName={displayName} />
                    <PLLinksBtn galleryName={displayName} />
                </CardSection>
            </SwiperSlide>

        </Swiper>
    </SwiperWrapper>
);

export default CardSectionDesktop;