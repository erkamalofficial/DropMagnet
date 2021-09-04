import React from 'react'
import styled from "styled-components";
import "./lazyCard.css"

const SwipeCard = styled.div`
  cursor: pointer;
  background-color: #262626;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
  background-size: auto 70%;
  background-repeat: no-repeat;
  background-position: center center;
  max-width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  will-change: transform;
  height: auto;
  padding: 0 14px;
`;
const SwipeCardDeviceContainer = styled.div`
  position: var(--card-device-container-pos);
  
  /* width: 100%; */
`;
const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  position: var(--card-elem-pos);
  width: 100%;
  .empty {
    opacity: 0;
  }
  margin: var(--card-header-section-margin);
  .card-title {
    font-size: var(--font-size-xl);
    @media (max-width: 340px) {
      background: #a98d8d61;
      backdrop-filter: blur(10px);
      padding: 5px 8px;
      border-radius: 5px;
    }
  }
  > * {
    font-weight: 700;
    color: var(--grayWhite);
    font-size: 20px;
  }
`;
const FooterSection = styled.div`
  position: var(--card-elem-pos);
  bottom: 0;
  background: var(--card-transparent-bg);
  text-align: center;
  margin-bottom: var(--card-title-section-margin);
  width: 100%;
`;
const FooterButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  font-weight: 700;
  line-height: 22px;
  margin-bottom: var(--card-title-section-text-margin);
  div {
    padding: 0 10px;
    border-radius: 3px;
    font-size: 14px
  }
  .rare {
    background: var(--corePurple);
    margin-right: 8px;
  }
  .art {
    background: var(--coreBlue);
    margin: 0 8px;
  }
  .price {
    width: 48px;
    height: 24px;
    border-radius: 3px;
    background-color: #6a8ad5;
    display: flex;
    align-items: center;
    column-gap: 4px;
    margin-left: 8px;
  }
`;
const FooterTitle = styled.div`
  margin: var(--card-title-text-margin);
  font-size: var(--font-size-l);
  width: auto;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SwipeImage = styled.div`
  background-position: 50.4587% 0%;
  background-size: 120.527%;
  width: var(--swipe-card-art-width);
  height: var(--swipe-card-art-width);
  background-repeat: no-repeat;
  margin: var(--swipe-card-art-margin);
`;

const HeaderBarMenuIcon = styled.div`
  height: 26px;
  width: 26px;
  border-radius: 19px;
  cursor: pointer;
  background: linear-gradient(#2e2e2e, #1e1e1e);
  box-shadow: inset 0 -1px 0px rgba(40, 0, 65, 1), 0 2px 4px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-self: center;
`;


const LazyCard = () => {
  return (
    <SwipeCard data-key="card-bdr"
    >
      <SwipeCardDeviceContainer data-key="card-rel-container">
        <HeaderSection key={1}>
          <div className="stripe circular-stripe"></div>
          <div className="stripe medium-stripe"></div>
          <div className="empty">......</div>
        </HeaderSection>
        <div
          data-key="art"
          key={2}
          className="img-container">
            <div className="img"></div>
          </div>
        <FooterSection key={3}>
          <div className="lazy-content long">
            <div className="stripe long-stripe"></div>
          </div>
          <FooterButtons>
            <div className="lazy-content last">
              <div className="stripe small-stripe"></div>
              <div className="stripe small-stripe"></div>
              <div className="stripe small-stripe"></div>
            </div>

          </FooterButtons>
        </FooterSection>
      </SwipeCardDeviceContainer>
    </SwipeCard>
  )
}

export default LazyCard
