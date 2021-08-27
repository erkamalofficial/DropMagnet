import React from "react"
import styled from "styled-components";
import search from "../assets/search.svg"

export const Field = styled.input`
    border-radius: 31.5px;
    background-image: linear-gradient(90deg, #181818, #131313D4);
    width:100%;
    display:block;
    position:relative;
    padding: 6px 18px 7px 44px;
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: left;
    outline: none !important;
    border: 0.75px solid black;
    &::placeholder{
     color: #d8d8d8;
    }
`;
const SearchWrapper = styled.div`
    position: relative;
    max-width: 382px;
    width: 90%;
    margin: 0 auto 8px;
    img{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left:16px;
        z-index: 99;
    }
`;

const Search = ({type, placeholder}) => {
    return (
        <SearchWrapper>
            <img src={search} alt=""/>
            <Field type={type} placeholder={placeholder}/>
        </SearchWrapper>
    )
}

export default Search