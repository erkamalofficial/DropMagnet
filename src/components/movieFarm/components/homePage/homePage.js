import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: calc(100vh - 99px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.h1`
  &.text {
    font-size: 32px;
    font-weight: 500;  
    position: relative;
    overflow: hidden;
    color: #000;
    // opacity: 0;
    transition: 1s ease;
  }
  
  &.text:before {
    content: '';
    position: absolute;
    left: 140%;
    width: 140%;
    height: 120%;
    background: linear-gradient(90deg, transparent 0%, #fff 25%, #fff 100%);
    animation: fadeToRight 17s linear forwards;
  }
  
  @keyframes fadeToRight {
    0% {
      left: -40%;
    }
    50% {
    }
    100% {
      left: 140%;
    }
  }
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 0;
  width: 158px;
  height: 52px;
  background-color: #000;
  color: #fff;
  font-weight: 900;
  font-size: 16px;
  border: none;
  cursor: pointer;
  opacity: 0;
  animation: fade 14s ease forwards;
  
  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const HomePage = () => {
   return(
       <Wrapper>
           <Text className='text'>The future of movies… is mind blowing.</Text>
           <PlayButton>Play Trailer</PlayButton>
       </Wrapper>
   )
}

export default HomePage;