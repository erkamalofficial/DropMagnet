import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import TinderCard from "./swipe-main";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "./card";
import PlusBtn from "../../components/blocks/plus-btn";
import MinusBtn from "../../components/blocks/minus-btn";
import './swiper.css';
import FadeIn from 'react-fade-in';
import { DropApi, useFetchCategoryDropsQuery, useFetchUserSavedDropsQuery, useSaveSwipedDropMutation, useUnSaveSwipedDropMutation } from "../../store/api/DropApi";
import LazyCard from "./LazyCard";
import { SwiperCard } from "./SwiperCard";

const ActionSection = styled.div`
  display: flex;
  justify-content: center;
`;
const CardContainer = styled.div`
  width: var(--card-container-width);
  height: var(--card-container-height);
  margin-bottom: 26px;
  justify-content: center;
  @media(max-width: 500px){
    width: 100%;
    margin-bottom: 18px;
  }
  
`;

function Swiper(props) {
  const [catgoryIndex, setCategoryIndex] = useState(new Date().getTime())
  const { data: categoryDrops, isSuccess, isFetching, isLoading } = useFetchCategoryDropsQuery({ userId: props.activeTabId, time: catgoryIndex }, { skip: !props.activeTabId });
  const { currentData: currenUserSavedDrops, isSuccess: isUserDropsSuccess } = useFetchUserSavedDropsQuery(props.activeTabSymbol, { skip: !props.activeTabSymbol })

  return (
    <>
      {(!isSuccess || isFetching || isLoading) ?
        <>
          <FadeIn delay={200}>
            <CardContainer key="cardContainer" className={'fix-minor-bug-swipe'} style={{ display: 'flex' }}>
              <LazyCard />
            </CardContainer>
          </FadeIn>
          <FadeIn delay={700}>
            <ActionSection key="footer" style={{ display: 'flex' }}>
              <MinusBtn>
                <img src="./minus.svg" alt="minus" />
              </MinusBtn>
              <PlusBtn>
                <img src="./plus.svg" alt="plus" />
              </PlusBtn>
            </ActionSection>
          </FadeIn>
        </>
        : (categoryDrops?.drops?.length > 0) ?
          <SwiperCard
            drops={[...categoryDrops.drops]}
            catgoryIndex={catgoryIndex}
            tabSymbol={props.activeTabSymbol}
            savedDrops={currenUserSavedDrops ? [...currenUserSavedDrops] : []}
            fetchMoreDrops={() => setCategoryIndex(categoryDrops.index)}
          />
          : <h4 style={{ textAlign: 'center', width: '100%', fontFamily: 'Azo Sans' }}>No Drops Available</h4>
      }
    </>
  )
}

export default Swiper;
