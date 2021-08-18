import React from "react";
import styled from "styled-components";


const CartWrap = styled.div`
    border-radius: 11px;
    background-color: #000000;
    width: 100%;
    height: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    margin: 8px auto;
    min-width: 274px;
`;
const Title = styled.p`
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: left;
    margin-top: 0;
    margin-bottom: 16px;
`;
const Content = styled.div`
    display: flex;
    justify-content: flex-start;
`;
const CartImg = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 9px;
    background-color: #333333;
    margin-right: 26px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
const Col = styled.div`
    display:flex;
    flex-direction: column;
`;
const TLDR = styled.p`
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    text-transform: uppercase;
    margin-bottom: 16px;
    margin-top: 0;
    display:block;
`;
const Price = styled.p`
    color: #ffffff;
    font-family: Quicksand;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    margin-bottom: 16px;
    margin-top: 0;
    display:block;
`;
const FileLink = styled.p`
    color: #ffffff;
    font-family: Quicksand;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    display:block;
    margin: 0;
    cursor: pointer;
`;

const Cart = () => {
    return (
        <CartWrap>
            <Title>File One Title</Title>
            <Content>
                <CartImg>

                </CartImg>
                <Col>
                    <TLDR>TL,DR</TLDR>
                    <Price>Price</Price>
                    <FileLink>Click to jump to file</FileLink>
                </Col>
            </Content>
        </CartWrap>
    )
}

export default Cart