import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Tabs from "./tabs";
import Swiper from "./swiper";
import "./index.css";
import FadeIn from 'react-fade-in';
import "../../components/detail_page/DropDetail/DropDetail.css";
import { getCategoryIdByPosition, getCategorySymbolByPosition, getFirstExternalCategoryPosition } from "../../utils/category";
import { useGetCategoriesQuery } from "../../store/api/DropApi";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  div.rel {
    position: relative;
    user-select: none;
    padding-top: var(--main-header-margin-top);
    padding-bottom: 68px;
    @media (max-width: 500px) {
      padding-top: 12px;
    }

    div.tabs-container {
      width: 100%;
      z-index: 3;
      position: fixed;
      padding: 68px 0 17px;
      margin-top: -24px;
      @media (max-width: 500px) {
        margin-bottom: 16px;
        margin-top: -12px;
      }
    }
  }
  div.card-section {
    padding-top: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 500px) {
      padding-top: 106px;
    }
  }
`;

const Home = (props) => {
  const { data: allCategories, isSuccess } = useGetCategoriesQuery();
  const [activeTabSymbol, setActiveTabSymbol] = useState(null);
  const [activeTabId, setActiveTabId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isSuccess) return
    console.log('useEffect activeIndex==>', activeIndex)
    const id = getCategoryIdByPosition(activeIndex, allCategories)
    const categorySymbol = getCategorySymbolByPosition(activeIndex, allCategories)
    setActiveTabId(id)
    setActiveTabSymbol(categorySymbol)
  }, [activeIndex, isSuccess])

  const handleActiveIndex = (index) => {
    setActiveIndex(index)
  }


  return (
    <HomeContainer>
      <div className="rel">
        <FadeIn delay={200}>
          <div className="tabs-container">
            <Tabs activeTabIndex={activeIndex} setActiveTabIndex={handleActiveIndex} />
          </div>
        </FadeIn>
        <div className="card-section">
          <Swiper activeTabId={activeTabId} activeTabSymbol={activeTabSymbol} />
        </div>
      </div>
    </HomeContainer>
  );
};

export default Home
