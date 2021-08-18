import React from "react"
import styled from "styled-components";
import search from "../assets/search.svg"

export const Field = styled.input`
    box-shadow: 0 0 2px rgba(0,0,0,0.05), inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 -1px 3px rgba(0, 0, 0, 0.5), inset 0 -3px 0 rgba(37, 37, 37, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.5);
    border-radius: 19px;
    background-image: linear-gradient(180deg, rgba(24, 24, 24, 0.83) 0%, rgba(19, 19, 19, 0.83) 100%);
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
    background: none;
    border: none;
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