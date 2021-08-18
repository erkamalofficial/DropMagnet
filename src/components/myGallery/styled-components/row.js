import styled from "styled-components";

export const Row = styled.div`
    display: flex;
    &.items-center{
        align-items: center;
    }
    &.items-bottom{
        align-items: flex-end;
    }
    &.justify-center{
        justify-content: center;
    }
    &.justify-between{
        justify-content: space-between;
    }
    &.flex-wrap{
        flex-wrap: wrap;
    }
    &.slider-padding{
        padding: 0 32px;
        @media(max-width: 530px){
            padding:0;
        }
    }
`