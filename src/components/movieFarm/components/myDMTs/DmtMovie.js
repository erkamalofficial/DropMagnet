import React from "react";
import styled from "styled-components";

const Dmt = styled.div`
 text-align: center;
`;

const Title = styled.h1`
 margin: 0;
 padding: 0;
 font-size: 18px;
 font-weight: 500;
 text-decoration: underline;
 margin-top: 98px;
 margin-bottom: 32px;
`;

const MovieBlock = styled.div`
  width: 100%;
  max-width: 469px;
  height: 263px;
  background-color: #D8D8D8;
  margin: 0 auto;
`;

const InfoText = styled.p`
  font-size: 18px;
  font-weight: 300;
  margin-top: 32px;
`;

const DmtMovie = () => {
    return(
        <Dmt>
            <Title>My DMTs</Title>
            <MovieBlock />
            <InfoText>This movie goes live on November 17th</InfoText>
        </Dmt>
    )
}

export default DmtMovie;