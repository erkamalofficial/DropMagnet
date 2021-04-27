import { render } from 'react-dom';
import '../../server';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import dataCollection from './data';
import Card from './card';
import PlusBtn from '../../components/blocks/plus-btn';
import MinusBtn from '../../components/blocks/minus-btn';
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";
import Tabs from './tabs';
import ProgressBar from './progress-bar';
import { useSelector, useDispatch } from "react-redux";

import './index.css';

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div.rel {
        height: 100vh;
        width: 460px;
        @media (max-width: 600px) {
            width: 100%;
            height: 100vh;
        }
        position: relative;
        padding-top:90px;
    }
`;
const ActionSection = styled.div`
    display: flex;
    position: absolute;
    bottom: 1%;
    left: 0;
    right: 0;
    justify-content: center;
`;

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({ x: 0, y: 0, scale: 1, rot: 0, delay: i * 50 })
const from = (i) => ({ x: 0, rot: 0, scale: 1, y: 0 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `scale(${s})`
const cardSelected = [];
function Deck({ cardList }) {
    const [cards, setCards] = useState(cardList);
    const dispatch = useDispatch();

    useEffect(() => {
        setCards(cardList);
    }, [cardList]);


    const [selectedIndex, setIndex] = useState(cardList.length - 1);

    const [gone] = useState(() => new Set())
    const [props, set] = useSprings(cards.length, (i) => ({ ...to(i), from: from(i) }))
    const bind = useGesture(({ args: [index], down, delta: [xDelta], distance, direction: [xDir], velocity }) => {
        const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
        if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        set((i) => {
            if (index !== i) return // We're only interested in changing spring-data for the current spring
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            const someValue = { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
            if (isGone) {
                setIndex((idx) => idx - 1); //set the index
                if (x > 0) {
                    cardSelected.push(index);
                    // dispatch({ type: 'art' });
                    // console.log('Selected cards: ', cardSelected)
                    dispatch({ type: "addUserData", payload: { selectedIndex: index } });
                }
            }
            return someValue
        })
        // When last item in the collection moved        
        if (!down && gone.size === cards.length) {
            setTimeout(() => {
                gone.clear()
                const filtered = cards.filter((el, i) => cardSelected.some((j) => i === j))
                cardSelected.length = 0;
                setCards(filtered)
                set((i) => to(i))
            }, 600)
        }
    })
    const handOnClick = (e, index, type) => {
        e.stopPropagation()

        const dir = type == 'next' ? 1 : -1;
        const down = false;
        const velocity = type == 'next' ? 0.21 : -0.21;
        const xDelta = type == 'next' ? 51 : -51;

        gone.add(selectedIndex);

        setIndex((idx) => idx - 1);

        set(i => {
            if (selectedIndex !== i) return;
            const isGone = gone.has(selectedIndex);

            const x = isGone ? (200 + window.innerWidth) * dir : 0;

            const rot = down ? (xDelta * 4 / 100 + (isGone ? dir * 10 * velocity : 0)) : type === "next" ? 30 : -30;

            const scale = down ? 1.05 : 1;
            if (isGone) {
                if (x > 0) {
                    cardSelected.push(index);
                    dispatch({ type: "addUserData", payload: { selectedIndex: index } });
                }
            }
            return {
                x,
                rot,
                scale,
                delay: undefined,
                config: { friction: 50, tension: down ? 800 : isGone ? 100 : 500 }
            };
        });
        // When last item in the collection clicked
        if (!down && gone.size === cards.length) {
            gone.clear()
            const filtered = cards.filter((el, i) => cardSelected.some((j) => i === j))
            cardSelected.length = 0;
            setCards(filtered);
            setIndex(filtered.length - 1);
            set((i) => to(i));
        }
    }


    return [
        <div className="card-container" key="card-container">
            {
                props.map(({ x, y, rot, scale }, i) => {
                    const card = cards[i];
                    return (
                        <animated.div key={i}
                            className="animatedMain"
                            style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
                            <animated.div
                                {...bind(i)}
                                className="animatedChild"
                                style={{
                                    transform: interpolate([rot, scale], trans),
                                    backgroundImage: `url(${card.drop_image})`,
                                    backgroundSize: '100% 58%%',
                                    backgroundPosition: 'center 32%'
                                }}
                            > <Card cardDetails={card} />
                            </animated.div>
                        </animated.div>
                    )
                })
            }
        </div>,
        <ActionSection key="footer">
            <MinusBtn onClick={(e) => handOnClick(e, selectedIndex, 'prev')}>-</MinusBtn>
            <PlusBtn onClick={(e) => handOnClick(e, selectedIndex, 'next')}>+</PlusBtn>
        </ActionSection>
    ];

}

const Home = (props) => {
    // const [activeTabIndex, setActiveTabIndex] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch("/api/arts")
            .then((res) => res.json())
            .then((json) => {
                dispatch({ type: 'arts', payload: json });
                // dispatch({ type: 'Arts', json });
            })
    }, []);
    // const [cardList, setCardList] = useState(dataCollection[activeTabIndex]);
    const tabList = ["arts", "music", "collectables", "fashion"];
    const activeTabIndex = useSelector((state) => {
        return state.category.general.activeTabIndex
    });
    const isLoading = useSelector((state) => state.category.general.isLoading);
    const currentTabId = tabList[activeTabIndex];

    const selectedCollection = useSelector((state) => {
        console.log('JJJ:', state);
        return state.category[currentTabId];
    });

    // const art = useSelector((state) => state.category.art);
    // const music = useSelector((state) => state.category.music);
    // const collectibles = useSelector((state) => state.category.collectibles);
    // const fashion = useSelector((state) => state.category.fashion);

    // const category = [art, music, collectibles, fashion];
    // const selectedCategory = category[activeTabIndex];

    const handleActiveTabIndex = (index) => {
        // setCardList(dataCollection[index]);
        // dispatch({ type: 'general', payload: { activeTabIndex: index } });
        dispatch({ type: tabList[index] });

    }
    return (
        <HomeContainer>
            <FixedHeader {...props} />
            <div className="rel">
                <Tabs
                    activeTabIndex={activeTabIndex}
                    handleActiveTabIndex={handleActiveTabIndex}
                    tabList={tabList}
                />
                {!isLoading &&
                    [<ProgressBar
                        size={selectedCollection.apiData.length}
                        selectedCount={selectedCollection.userSelectedCards.length}
                    />,
                    <Deck cardList={selectedCollection.apiData} />]
                }
            </div>
        </HomeContainer>
    );
};

export default Home;
