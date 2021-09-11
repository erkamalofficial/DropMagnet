import React from 'react'
import styled from "styled-components";

const CardWrapper = styled.div`
    padding: 8px 16px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`;
const CardSize = styled.div`
    max-width:382px;
    max-height: 382px;
    width:100%;
    height: calc(100vw - 32px);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    img{
        position:absolute;
        z-index:-1;
        width:100%;
        height:100%;
        object-fit:contain;
    }
`;

const LazyCards = () => {
    return (
        <CardWrapper>
            <CardSize className="lazy-card">
                <div className="circular lazy"></div>
                <div className="nft lazy"></div>
                <div className="url lazy"></div>
            </CardSize>
        </CardWrapper>
    )
}

export default LazyCards
