import styled from 'styled-components';

const BuyBtn = styled.button`
    width: 259px;
    height: 40px;
    padding-bottom: 2px;
    box-shadow: 0 3px 4px rgb(0 0 0 / 50%), inset 0 -2px 0 var(--grayWhite);
    border-radius: 20px;
    border: 1px solid var(--grayWhite);
    background-color: rgba(0,0,0,0.5);
    font-family: Quicksand;
    font-size: 17px;
    font-weight: 700;
    color: var(--white);
    outline: none;
    order: 2;
`;
export default function () {
    return <BuyBtn> Buy for 1Ξ </BuyBtn>;
};
