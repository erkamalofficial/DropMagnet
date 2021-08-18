import React from "react"
import styled from "styled-components";

export const Field = styled.input`
    box-shadow: 0 0 2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 -1px 3px rgba(0, 0, 0, 0.5), inset 0 -3px 0 rgba(37, 37, 37, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 19px;
    background-image: linear-gradient(180deg, rgba(24, 24, 24, 0.83) 0%, rgba(19, 19, 19, 0.83) 100%);
    max-width: 310px;
    width: 100%;
    padding: 8px 18px;
    color: #d8d8d8;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: left;
    outline: none !important;
    background: none;
    border: none;
    &::placeholder{
    color: #d8d8d8;
    }
    @media(max-width: 500px){
    display: none;
    }
`

const TextField = ({type, placeholder}) => {
    return (
        <>
            <Field type={type} placeholder={placeholder}/>
        </>
    )
}

export default TextField