import React, { useMemo, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import TinderCard from "./swipe-main";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "./card";
import PlusBtn from "../../components/blocks/plus-btn";
import MinusBtn from "../../components/blocks/minus-btn";
import DropDetail from "../../components/detail_page/DropDetail/DropDetail";
import './swiper.css';
import FadeIn from 'react-fade-in';
import { useFetchCategoryDropsQuery, useFetchUserSavedDropsQuery, useSaveSwipedDropMutation, useUnSaveSwipedDropMutation } from "../../store/api/DropApi";
import LazyCard from "./LazyCard";

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

const alreadyRemoved = [];
const CARD_PRELOAD = 25; //card count to preload
function Swiper(props) {
  const [catgoryIndex, setCategoryIndex] = useState(new Date().getTime())
  const { userId } = useSelector((state) => state.auth);
  const { data: categoryDrops, isSuccess, isFetching, isLoading } = useFetchCategoryDropsQuery({ userId: props.activeTabId, time: catgoryIndex });
  const { data: userSavedPosts } = useFetchUserSavedDropsQuery(props.activeTabSymbol)

  const [saveCategoryDrop] = useSaveSwipedDropMutation();
  const [unSaveCategoryDrop] = useUnSaveSwipedDropMutation();

  const [openView, setOpenView] = useState(false)
  const [curDrop, setCurDrop] = useState({})
  const history = useHistory()

  const swipe = (dir) => {
    const drop = categoryDrops.drops[categoryDrops.drops.length - 1]
    handleDropSwipe(dir, drop)
  };


  function openDrop(d) {
    setCurDrop(d)
    setOpenView(true)
  }

  function renderDetail() {
    return (
      <div className="drop-detail-container">
        <DropDetail
          show={true}
          drop={curDrop}
          closeDetailView={() => setOpenView(false)}
          handleClick={() => console.log("Click")} />
      </div>
    )
  }

  const handleDropSwipe = async (dir, drop) => {
    if (dir === "right") {
      const length = userSavedPosts ? userSavedPosts?.length : 0
      if (length < 10) {
        await saveCategoryDrop({ symbol: drop.category, userId: drop.user_id, drop, time: catgoryIndex })
        if (length + 1 === 10) {
          handleFullBucket()
        }
      } else {
        handleFullBucket()
      }
    }
    if (dir === "left") {
      await unSaveCategoryDrop({ symbol: drop.category, userId: drop.user_id, drop, time: catgoryIndex })
    }
    if ((categoryDrops.drops?.length - 1) === 0) {
      setCategoryIndex(categoryDrops.index)
    }
  }

  const handleFullBucket = () => {
    if (window.confirm("Your Bucket Limit has reached its End ? \n 1. Press ok to 'Upgrade Your Subscription' \n 2. Press Cancel to 'Go To Reswipe'?")) {
      history.push('/upgradeSub');
    } else {
      history.push(`/reswipe?tabs=${props.activeTabId}`);
    }
  }

  return (
    <>
      {(!isSuccess || isFetching || isLoading) ?
        <>
          <FadeIn delay={200}>
            <CardContainer key="cardContainer" className={'fix-minor-bug-swipe'}>
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
          <>
            <div className="view-container" id="detCnt" style={{ display: `${!openView ? 'none' : 'block'}` }} >
              {openView && renderDetail()}
            </div>
            <CardContainer onClick={renderDetail} key="cardContainer" className={'fix-minor-bug-swipe swiper-card-container'} style={{ display: `${openView ? 'none' : 'flex'}` }}>
              {categoryDrops.drops.map((cardDetails, index) => {
                const { id } = cardDetails;
                return (
                  <TinderCard
                    className={`swipe ${id}`}
                    data-id={id}
                    key={id}
                    onSwipe={(dir) => {
                      if (userId) {
                        handleDropSwipe(dir, cardDetails)
                      } else { history.push("/login") }

                    }}
                    onClickSwiperMain={() => openDrop(cardDetails)}
                    // onCardLeftScreen={() => outOfFrame(id)}
                    overlayLabels={true}
                  >
                    <Card {...cardDetails} title={cardDetails.title.slice(0, 25)} />
                  </TinderCard>
                );
              })}
            </CardContainer>
            <ActionSection key="footer" style={{ display: `${openView ? 'none' : 'flex'}` }}>
              <MinusBtn onClick={() => {
                if (userId) {
                  swipe("left")
                }
                else { history.push("/login") }
              }}>
                <img src="./minus.svg" alt="minus" />
              </MinusBtn>
              <PlusBtn onClick={() => {
                if (userId) {
                  swipe("right")
                }
                else { history.push("/login") }
              }}>
                <img src="./plus.svg" alt="plus" />
              </PlusBtn>
            </ActionSection>
          </>
          : <h4 style={{ textAlign: 'center', width: '100%', fontFamily: 'Azo Sans' }}>No Drops Available</h4>
      }
    </>
  )
}

export default Swiper;
