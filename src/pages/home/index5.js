import { render } from 'react-dom';
import React, { useState } from 'react';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import './index5.css'

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({ x: 0, y: 0, scale: 1, rot: 0, delay: i * 50 })
const from = (i) => ({ x: 0, rot: 0, scale: 1.1, y: -150 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) => `scale(${s})`
const cardSelected = []
function Deck({ cardList }) {
    const [cards, setCards] = useState(cardList)
    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
    const [props, set] = useSprings(cards.length, (i) => ({ ...to(i), from: from(i) })) // Create a bunch of springs using the helpers above
    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
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
                if (x > 0) {
                    cardSelected.push(index)
                    // console.log('Selected cards: ', cardSelected)
                }
            }
            return someValue
        })
        if (!down && gone.size === cards.length) {
            setTimeout(() => {
                gone.clear()
                // cardSelected.map((v) => gone.add(v))
                const filtered = cards.filter((el, i) => cardSelected.some((j) => i === j))
                // console.log('Selected cards: ', cardSelected)
                // console.log('filtered cards: ', filtered)
                cardSelected.length = 0;
                console.log("JJJ: ", filtered);
                setCards(filtered)
                set((i) => to(i))
            }, 600)
        }
    })
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */ }
    return props.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} className="animatedMain" style={{ transform: interpolate([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`) }}>
            <animated.div
                {...bind(i)}
                className="animatedChild"
                style={{
                    transform: interpolate([rot, scale], trans),
                    backgroundImage: `url(${cards[i]})`
                }}
            />
        </animated.div>
    ))
}

const Home = () => {
    const cards = [
        'https://digitalstudiosproduct.discovery.com/prototypes/fn-recipe-meal-match-hybrid/assets/recipe-1.jpg',
        'https://digitalstudiosproduct.discovery.com/prototypes/fn-recipe-meal-match-hybrid/assets/recipe-2.jpg',
        'https://digitalstudiosproduct.discovery.com/prototypes/fn-recipe-meal-match-hybrid/assets/recipe-3.jpg',
        'https://digitalstudiosproduct.discovery.com/prototypes/fn-recipe-meal-match-hybrid/assets/recipe-4.jpg',
        'https://digitalstudiosproduct.discovery.com/prototypes/fn-recipe-meal-match-hybrid/assets/recipe-5.jpg',
        'https://digitalstudiosproduct.discovery.com/prototypes/fn-recipe-meal-match-hybrid/assets/recipe-6.jpg',
        'https://digitalstudiosproduct.discovery.com/prototypes/fn-recipe-meal-match-hybrid/assets/recipe-7.jpg',
        'https://digitalstudiosproduct.discovery.com/prototypes/fn-recipe-meal-match-hybrid/assets/recipe-8.jpg',
        'https://digitalstudiosproduct.discovery.com/prototypes/fn-recipe-meal-match-hybrid/assets/recipe-9.jpg',
        'https://digitalstudiosproduct.discovery.com/prototypes/fn-recipe-meal-match-hybrid/assets/recipe-10.jpg'
    ]

    return <div className="card-container">
        <Deck cardList={cards} />
    </div>
}

export default Home;
