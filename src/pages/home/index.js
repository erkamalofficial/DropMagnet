// import "../../server";
import styled from "styled-components";
import React, { useEffect, useMemo, useState, useCallback, useContext } from "react";
import DateMenu from "../../components/detail_page/DateMenu/DateMenu";
import HeaderBar from "../../components/elements/HeaderBar/HeaderBar";
import Tabs from "./tabs";
import ProgressBar from "./progress-bar";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryDrops } from "./actions";
import Spinner from "../../components/blocks/spinner";
import Swiper from "./swiper";
import "./index.css";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../contexts/FirebaseAuthContext";
import { getCategorySavedDrops, saveDrop, unsaveDrop, updateTokens } from "../../DropMagnetAPI";
import LazyCard from "./LazyCard";
import LazyTab from "./LazyTab";
import { getCategoryFromTab, tabList } from "../../constants";
import PlusBtn from "../../components/blocks/plus-btn";
import MinusBtn from "../../components/blocks/minus-btn";
import FadeIn from 'react-fade-in';
import { GlobalContext } from "../../utils/GlobalContext";
import { getCategorySymbolByPosition, getCategoryIdByPosition } from "../../utils/category";
// jsx upgrade
import * as DROP_SERVICE from '../../services/drop-services';
import DropDetail from "../../components/detail_page/DropDetail/DropDetail";
import store from "../../store";
import { setOpen } from "../../store/OpenCard";

import "../../components/detail_page/DropDetail/DropDetail.css";
import { useFetchCategoryDropsQuery, useFetchUserSavedDropsQuery, useGetCategoriesQuery, useSaveSwipedDropMutation, useUnSaveSwipedDropMutation } from "../../store/api/DropApi";
import { categorySavedBuckets } from "../../store/reducers/CategoryReducer";

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

const Home = () => {
  const [activeTabSymbol, setActiveTabSymbol] = useState(null);
  const [activeTabId, setActiveTabId] = useState(null);

  return (
    <HomeContainer>
      <div className="rel">
        <FadeIn delay={200}>
          <div className="tabs-container">
            <Tabs changeCurrentTab={(id, categorySymbol) => { setActiveTabId(id); setActiveTabSymbol(categorySymbol); }} />
          </div>
        </FadeIn>
        <div className="card-section">
          <Swiper activeTabId={activeTabId} activeTabSymbol={activeTabSymbol} />
          )
        </div>
      </div>
    </HomeContainer>
  );
};

export default React.memo(Home);
