import styled from "styled-components";

export const Container = styled.div`
    max-width: 1360px;
    width: 100%;
    padding: 0 32px;
    margin: 0 auto;
    &.slider-container{
        @media (max-width: 480px){
           padding: 0 5px !important;
        }
    }
   @media (max-width: 370px){
       padding: 0 10px
    }
`;
export const ContainerRow = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
    margin-left: -16px;
    margin-right: -16px;
    @media(max-width: 370px){
       margin-left: -10px;
    margin-right: -10px;
    }
    &.items-center{
        align-items: center;
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
    &.mt-25{
        margin-top: 25px;
    }
`;
export const ConatinerCol = styled.div`
    display: flex;
    padding: 0 16px;
    flex: 0 0 25%;
    @media(max-width: 370px){
    padding: 0 10px;
    }
`;
export const ContainerWithBackground = styled.div`
    max-width: 1360px;
    width: 100%;
    padding: 59px 32px;
    margin: 0 auto;
    box-shadow: 0 0 2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 -1px 3px rgba(0, 0, 0, 0.5), inset 0 -3px 0 rgba(37, 37, 37, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 19px;
    background-image: linear-gradient(180deg, rgba(24, 24, 24, 0.83) 0%, rgba(19, 19, 19, 0.83) 100%);
`;