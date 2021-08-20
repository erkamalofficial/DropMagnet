import React, {useCallback, useRef, useState} from "react";
import styled from "styled-components";
import cardImg from "../../assets/portrait.png"
import dots from "../../assets/dots.svg";
import GalleryModal from "../galleryModal";
import LikeButton from "../newUserContent/styled-components/likeButton";

const SlideWrapper = styled.div`
   position: absolute;
   
   width:100%;
   // height:100vh;
   perspective: 1500px;
   display:flex;
   flex-direction: column;
   align-items:center;
   justify-content:center;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
     -moz-transform: translate(-50%,-50%);
      -ms-transform: translate(-50%,-50%);
       -o-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
          
    &.safari {
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%,-50%);
       -moz-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
         -o-transform: translate(-50%,-50%);
          transform: translate(-50%,-50%);
    }   
`;
const CardWrapper = styled.div`
   display:flex;
   align-items:center;
   justify-content:center;
   width:100%;
   height:425px;

   @media(max-width: 425px) {
    height: initial;
    padding-top: 100%;
    position: relative;
  }
`;
const Card = styled.div`
  // border-radius: 10px;
  overflow:hidden;
  box-shadow: 0 1px 5px #00000099;
  width: 100%;
  height: 425px;
  max-width: 425px;
  background-image: url(${cardImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  transition-duration: 300ms;
  transition-property: transform, box-shadow;
  transition-timing-function: ease-out;
  transform: rotate3d(0,0,0,0deg);
  @media(max-width: 425px) {
    width: 100%;
    height: 100%;
    top: 0;
  }
  &:hover{
  transition-duration: 150ms;
  box-shadow: 0 5px 20px 5px #00000044;
  }
  &:active{
  transition-duration: 150ms;
  box-shadow: 0 5px 20px 5px #00000044;
  }
  .glow{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-image: radial-gradient(circle at 50% -20%, #ffffff22, #0000000f);
  }
  
`;

const GalleryButtonWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
    margin-top: 16px;
    
    .button{
        // width: 51px;
        // height: 51px;
        // border-radius: 100px;
        // background-color: #ffffff;
        // border:none;
        width: 99px;
        height: 40px;
        border-radius: 9px;
        border: 0.75px solid #000000;
        border: 1px solid #000;
        outline: none;
        margin: 0 8px;
        cursor:pointer;
        display:flex;
        align-items:center;
        justify-content: center;
        img{
        width: 27px;
        }
    }
`

const HoveredCard = ({iOS}) => {
    const cardRef = useRef();
    const [center, setCenter] = useState({x: 0, y: 0, distance: 0});
    const [scale, setScale] = useState({x: 1, y: 1, z: 1});
    const [bound, setBound] = useState({width: 0, height: 0});
    const [grow, setGrow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const rotateToMouse = useCallback((e) => {
        const bounds = cardRef.current.getBoundingClientRect();
        const leftX = e.clientX - bounds.x;
        const topY = e.clientY - bounds.y;
        const x = leftX - bounds.width / 2;
        const y = topY - bounds.height / 2;
        setGrow(true);
        setBound(prevState => ({...prevState, width: bounds.width / 2, height: bounds.height / 2}));
        setCenter(prevState => ({...prevState, x, y, distance: Math.sqrt(x ** 2 + y ** 2)}));
        setScale(prevState => ({...prevState, x: 1.07, y: 1.07, z: 1.07}));
    }, []);

    const mouseLeave = useCallback(() => {
        document.removeEventListener('mousemove', rotateToMouse);
        setGrow(false);
        setBound(prevState => ({...prevState, width: 0, height: 0}));
        setCenter({x: 0, y: 0, distance: 1});
        setScale(prevState => ({...prevState, x: 1, y: 1, z: 1}));
    }, [rotateToMouse]);

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    return (
        <div className="slider-container">
            <SlideWrapper className={iOS && 'safari'}>
                <CardWrapper>
                    <Card
                        ref={cardRef}
                        className={".card"}
                        style={{transform: `scale3d(${scale.x}, ${scale.y}, ${scale.z}) rotate3d(${center.y / 100},${-center.x / 100},0,${Math.log(center.distance) * 2}deg)`}}
                        onMouseMove={rotateToMouse}
                        onMouseLeave={mouseLeave}>
                        <div className="glow" style={{
                            backgroundImage: `${grow ? `radial-gradient(circle at ${center.x * 2 + bound.width}px ${center.y * 2 + bound.height}px, #ffffff55, #0000000f)` : ""}`,
                            backdropFilter: `hue-rotate(180deg)`
                        }}/>
                    </Card>
                </CardWrapper>
                <GalleryButtonWrapper>

                    {/*<button>*/}
                    {/*    <img src={share} alt="share"/>*/}
                    {/*</button>*/}

                    <LikeButton galleryStyle='gallery-style'/>

                    <div className='button' onClick={openModal}>
                        <img src={dots} alt="dots"/>
                    </div>
                </GalleryButtonWrapper>
            </SlideWrapper>
            <GalleryModal isOpen={isOpen} closeModal={closeModal}/>
        </div>
    )
}

export default HoveredCard