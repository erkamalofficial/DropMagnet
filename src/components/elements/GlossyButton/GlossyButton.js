import React from 'react'
import styled from "styled-components";

const GlossyButton = ({label, btnStyle, lableStyle, borderStyle}) => {

    const Button = styled.div`
    position: relative;
    padding: ${btnStyle.padding};
    color: #ffffff;
    font-size: ${btnStyle.fontSize};
    font-weight: ${btnStyle.fontWeight};
    text-align: center;
    background-color: inherit;
    display: flex;
    align-items: center;
    justify-content: center; 
    border-radius: ${btnStyle.borderRadius};
    text-transform: ${btnStyle.textTransform};
    cursor: ${btnStyle.cursor};

    span{
        z-index: 9;
        line-height: 18px;
        margin-bottom: ${lableStyle.marginBottom};
    }

    ::before{
        content: '';
        top: ${borderStyle.pos};
        left: ${borderStyle.pos};
        right: ${borderStyle.pos};
        bottom: ${borderStyle.pos};
        position: absolute;
        max-width: 100%;
        height: 100%;
        border-radius: ${borderStyle.borderRadius};
        border: ${borderStyle.border} solid transparent;
        background-image: linear-gradient(${borderStyle.grd1}, ${borderStyle.grd2}), radial-gradient(circle at top left,${borderStyle.grd3},${borderStyle.grd4});
        background-origin: border-box;
        background-clip: content-box, border-box;
        z-index: 0;
        opacity: 1 !important; 
    }
`

    return (
        <Button>
            <span>{label}</span>
        </Button>
    )
}

export default GlossyButton
