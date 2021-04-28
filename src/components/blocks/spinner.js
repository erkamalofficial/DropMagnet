import styled from 'styled-components';


const SpinnerWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    height: 100%;
    align-items: center;
    .drop-loader {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 80px;
    }

    .drop-loader div {
        position: absolute;
        border: 4px solid #fff;
        opacity: 1;
        border-radius: 50%;
        animation: drop-loader 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .drop-loader div:nth-child(2) {
        animation-delay: -0.5s;
    }

    @keyframes drop-loader {
        0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
        }
    }
`

const Spinner = () => (
    <SpinnerWrapper>
        <div className="drop-loader">
            <div></div>
            <div></div>
        </div>
    </SpinnerWrapper>
);

export default Spinner;