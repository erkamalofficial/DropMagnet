import React, { useMemo, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import TinderCard from "../home/swipe-main";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PlusBtn from "../../components/blocks/plus-btn";
import MinusBtn from "../../components/blocks/minus-btn";
import DropDetail from "../../components/detail_page/DropDetail/DropDetail";
import '../home/swiper.css';
import FadeIn from 'react-fade-in';
import { useSaveReSwipedDropMutation, useUnSaveReSwipedDropMutation } from "../../store/api/DropApi";
import LazyCard from "../home/LazyCard";
import Card from "../home/card";

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
export const DropsReswiper = (props) => {
    const { drops } = props;
    // const [saveUserReSwipedDrop] = useSaveReSwipedDropMutation();
    // const [unSaveUserReSwipedDrop] = useUnSaveReSwipedDropMutation();
    const { userId } = useSelector((state) => state.auth);
    const [openView, setOpenView] = useState(false)
    const [curDrop, setCurDrop] = useState({})
    const history = useHistory()

    const childRefs = useMemo(
        () =>
            drops && drops.length > 0 && Array(drops.length)
                .fill(0)
                .map((i) => React.createRef()),
        [drops.length]
    );

    const buttonSwipe = (dir) => {
        const cardsLeft = drops.filter(
            (card) => !alreadyRemoved.includes(card.id)
        );
        if (cardsLeft.length) {
            console.log('cardsLeft directioin======> ', dir)
            const toBeRemoved = cardsLeft[cardsLeft.length - 1].id;
            const index = drops.map((card) => card.id).indexOf(toBeRemoved);
            childRefs[index].current.swipe(dir);
            console.log('swipe======> ', { 
                ref: childRefs, 
                curr:  childRefs[index].current })
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

    const handleDropSwipe = async (dir, drop) => {
        props.onReswipe(dir, drop.id)
        alreadyRemoved.push(drop.id);
        // if (dir === "right") {
        //     await saveUserReSwipedDrop({ symbol: drop.category, dropId: drop.id })
        // }
        // if (dir === "left") {
        //     await unSaveUserReSwipedDrop({ symbol: drop.category, dropId: drop.id })
        // }
    }

    console.log('current ref', childRefs)
    return (
        <>
            {(!drops) ?
                <>
                    <FadeIn delay={200}>
                        <CardContainer key="cardContainer" className={'fix-minor-bug-swipe'} style={{display: 'flex'}}>
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
                : (drops?.length > 0) ?
                    <>
                        <div className="view-container" id="detCnt" style={{ display: `${!openView ? 'none' : 'block'}` }} >
                            {openView && renderDetail()}
                        </div>
                        <CardContainer onClick={renderDetail} key="cardContainer" className={'fix-minor-bug-swipe swiper-card-container'} style={{ display: `${openView ? 'none' : 'flex'}` }}>
                            {drops.map((cardDetails, index) => {
                                const { id } = cardDetails;
                                return (
                                    <TinderCard
                                        ref={childRefs[index]}
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
                                    buttonSwipe("left")
                                }
                                else { history.push("/login") }
                            }}>
                                <img src="./minus.svg" alt="minus" />
                            </MinusBtn>
                            <PlusBtn onClick={() => {
                                if (userId) {
                                    buttonSwipe("right")
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