import React from 'react'
import Spinner from '../../blocks/spinner'
import styled from "styled-components";

const Loader = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    backdrop-filter: blur(22px);
    z-index: 9999999;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: "Azo Sans";
    font-size: 22px;
    font-weight: 700;
    color: #8f8f8f;
`

const LoadingModal = ({label}) => {
    return (
        <Loader>
            <div className="cnt">
                <Spinner />
            </div>
            {label}
        </Loader>
    )
}

export default LoadingModal
