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
  width: 400;
  margin: auto;
  margin-top: 8px;
  .swiper-container {
    width: 100%;
    height: 100%;
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
    margin: 0 20px 20px;
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
    font-weight: 700;

`;
const CardSectionMobile = ({ displayName }) => (



    <CardSection>
        <SwiperWrapper>
            <Swiper
                slidesPerView={3}
                navigation={true}
                freeMode={true}
            >
                <SwiperSlide>
                    <span>🎨</span>
                    <HeaderSubtitle>Artists</HeaderSubtitle>
                </SwiperSlide>
                <SwiperSlide>
                    <span>🌕</span>
                    <HeaderSubtitle>Collectors</HeaderSubtitle>
                </SwiperSlide>
                <SwiperSlide>
                    <span>🧥</span>
                    <HeaderSubtitle>Fashion</HeaderSubtitle>
                </SwiperSlide>
                <SwiperSlide>
                    <span>🎭</span>
                    <HeaderSubtitle>Music</HeaderSubtitle>
                </SwiperSlide>
            </Swiper>
        </SwiperWrapper>
        <PLLinksBtn galleryName={displayName} />
        <PLLinksBtn galleryName={displayName} />
        <PLLinksBtn galleryName={displayName} />
    </CardSection>
);

export default CardSectionMobile;