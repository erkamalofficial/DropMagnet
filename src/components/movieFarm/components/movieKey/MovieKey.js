import React from "react";
// import '../../../../../App.scss';
import styled from "styled-components";

const Wrapper = styled.div`
  text-align: center;
  height: calc(100vh - 99px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: red 
`;
const TextWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: #fff;
    mix-blend-mode: screen;
    
    h1 {
      font-size: 80px;
    }
`;

const MainText = styled.h1`
  font-size: 85px;
  font-weight: 900;
  margin: 0 0 40px 0;
  color: transparent;
  mix-blend-mode: screen;
`;

const SubText = styled.h2`
  font-size: 36px;
  font-weight: 500;
  margin: 0;
  color: transparent;
  mix-blend-mode: screen;
  .bold {
    font-weight: 900;
  }
`;

const MovieKey = () => {
    return(
        <Wrapper>
            <TextWrapper>
                <h1>MovieKey™</h1>
                <h2>The Ultimate MovieFarm experience.</h2>
                <MainText > </MainText>
                <SubText >The Ultimate MovieFarm experience.</SubText>
            </TextWrapper>
        </Wrapper>
    )
}

export default MovieKey;