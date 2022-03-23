import React, { useState, useEffect, useMemo, useRef, createRef } from 'react'
import { useHistory } from 'react-router-dom';
import { useFetchUserSavedDropsQuery, useSaveSwipedDropMutation, useUnSaveSwipedDropMutation } from '../../store/api/DropApi';
import TinderCard from "./swipe-main";
import styled from "styled-components";
import Card from "./card";
import PlusBtn from "../../components/blocks/plus-btn";
import MinusBtn from "../../components/blocks/minus-btn";
import DropDetail from "../../components/detail_page/DropDetail/DropDetail";
import './swiper.css';
import FadeIn from 'react-fade-in';
import LazyCard from "./LazyCard";
import { useSelector } from 'react-redux';

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

let alreadyRemoved = []
export const SwiperCard = ({ drops, catgoryIndex, savedDrops, onSwipe, tabSymbol, fetchMoreDrops }) => {
    const history = useHistory()
    const [saveCategoryDrop, { isLoading: isUpdateding }] = useSaveSwipedDropMutation();
    const [unSaveCategoryDrop] = useUnSaveSwipedDropMutation();
    
    console.log('Swiper Card re-render')
    const [selectedCategoryDrops, setSelectedCategoryDrops] = useState(drops)
    const [userSavedDrops, setUserSavedDrops] = useState(savedDrops)
    // const { userId } = useSelector((state) => state.auth);
    const [openView, setOpenView] = useState(false)
    const [curDrop, setCurDrop] = useState({})


    const dropRefs = useMemo(() => Array(selectedCategoryDrops.length).fill(0).map((i) => createRef()), [])

    const buttonSwipe = (dir) => {
        const cardsLeft = selectedCategoryDrops.filter(
            (card) => !alreadyRemoved.includes(card.id)
        );
        if (cardsLeft.length) {
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].id;
            const index = selectedCategoryDrops.map((card) => card.id).indexOf(toBeRemoved);
            dropRefs[index].current.swipe(dir);
        }
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

    const handleDropSwipe = (dir, drop, length) => {
        console.log('selectedCategoryDrops', { selectedCategoryDrops, userSavedDrops })
        // onSwipe(dir, drop, catgoryIndex)
        if (dir === 'right') {
            let length = userSavedDrops ? userSavedDrops.length : 0
            if (length < 10) {
                userSavedDrops.push(drop)
                setUserSavedDrops(userSavedDrops)
                setTimeout(() => {
                    saveCategoryDrop({ symbol: drop.category, userId: drop.user_id, drop, time: catgoryIndex })
                }, 500)
            } else {
                handleFullBucket()
            }
        }
        if (dir === "left") {
            setTimeout(() => {
                unSaveCategoryDrop({ symbol: drop.category, userId: drop.user_id, drop, time: catgoryIndex })
            }, 500)
        }
        if ((selectedCategoryDrops.length - 1) === 0) {
            console.log('Cards Empty')
            fetchMoreDrops()
            // setCategoryIndex(categoryDrops.index)
        }
        const index = selectedCategoryDrops.findIndex((d) => d.id === drop.id)
        selectedCategoryDrops.splice(index, 1)
        setSelectedCategoryDrops(selectedCategoryDrops)
        alreadyRemoved.push(drop.id);
    }

    const handleFullBucket = () => {
        if (window.confirm("Your Bucket Limit has reached its End ? \n 1. Press ok to 'Upgrade Your Subscription' \n 2. Press Cancel to 'Go To Reswipe'?")) {
            history.push('/upgradeSub');
        } else {
            history.push(`/reswipe?tabs=${tabSymbol}`);
        }
    }

    return (
        <>
            <div className="view-container" id="detCnt" style={{ display: `${!openView ? 'none' : 'block'}` }} >
                {openView && renderDetail()}
            </div>
            <CardContainer onClick={renderDetail} key="cardContainer" className={'fix-minor-bug-swipe swiper-card-container'} style={{ display: `${openView ? 'none' : 'flex'}` }}>
                {selectedCategoryDrops.map((cardDetails, index) => {
                    const { id } = cardDetails;
                    return (
                        <TinderCard
                            ref={dropRefs[index]}
                            className={`swipe ${id}`}
                            data-id={id}
                            key={index}
                            onSwipe={(dir) => {
                                // if (userId) {
                                handleDropSwipe(dir, cardDetails, userSavedDrops ? userSavedDrops.length : 0)
                                // } else { history.push("/login") }

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
                    // if (userId) {
                    buttonSwipe("left")
                    // }
                    // else { history.push("/login") }
                }}>
                    <img src="./minus.svg" alt="minus" />
                </MinusBtn>
                <PlusBtn onClick={() => {
                    // if (userId) {
                    buttonSwipe("right")
                    // }
                    // else { history.push("/login") }
                }}>
                    <img src="./plus.svg" alt="plus" />
                </PlusBtn>
            </ActionSection>
        </>
    )
}
