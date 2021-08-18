import styled from "styled-components";

export const CardsWrapper = styled.div`
    // display:flex;
    // flex-wrap: wrap;
    // margin-top: 20px;
    // flex: 0 0 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-left: 1px solid black;
    width: 100%;
    max-width: 564px;
    margin-left: -8.5px;
    margin-right: -8.5px;
    @media(max-width: 470px) {
        margin-left: -7px;
        margin-right: -7px;
        grid-template-columns: repeat(2, 1fr)
    }
`