import styled from "styled-components";

export const InsetBox = styled.div`
    max-width: 564px;
    margin: 0 auto;
    width:100%;
    // box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 0 5px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    // background-color: #242424;
    padding: 23px 36px 19px;
    @media (max-width: 375px) {
        padding: 23px 26px 19px;
    }
`