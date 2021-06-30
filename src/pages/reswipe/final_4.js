import React, { useState } from "react";
import ReswipeCard from "./reswipe_card";
import styled from "styled-components";

const Final4Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 180px);
  grid-template-columns: repeat(2, 150px);
  grid-gap: 15px;
  margin: auto;
`;

const DropCard = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  background: #fff;
  flex-direction: column;
  box-shadow: rgb(0, 130, 255) 0px 0px 0px 3px;
  transition: all 0.4s;
  > .drop-img {
    width: 100%;
    height: 100%;
    /* clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 67% 92%, 33% 99%, 0% 93%); */
  }
  > .title-author {
    padding: 4px 8px;
    width: 100%;
    transition: all 0.2s;
    > h3,
    p {
      margin: 0 auto;
    }
    > h3 {
      font-size: 16px;
      margin-bottom: 2px;
    }
    > p {
      font-size: 13px;
      color: rgb(102, 102, 102);
      font-weight: 500;
    }
  }
  :active {
    transform: scale(0.9);
  }
`;

const DropTitle = styled.h3`
  color: #000;
  font-weight: 600;
  font-size: 20px;
`;

const CloseSVG = styled.svg`
    width: 13px;
    height: 11px;
    display: inline-block;
    vertical-align: top;
    fill: none;
    margin: 7px 0 0 5px;
    stroke: rgb(255, 255, 255);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 0px;
    transition: stroke-dashoffset 0.4s ease .15s;
`
const CloseSVGContainer = styled.span`
    background: #0082ff;
    border: 2px solid #fff;
    position: absolute;
    border-radius: 50%;
    right: 10px;
    top: 10px;
    z-index: 1;
    width: 28px;
    height: 28px;
    opacity: 1;
    transition: transform .15s, opacity calc(.15s * 1.2) linear;
    transform: scale(1);
`


export default function FinalFour({ bucket, deleted, onChange }) {
  const handleChange = (isDeleted, index) => {
    onChange(isDeleted, index);
  };
  return (
    <ReswipeCard>
      <h1
        className={"h1-large"}
        style={{ fontSize: "32px", textAlign: "center" }}
      >
        You’re so good at this!
      </h1>
      <Final4Grid>
        {bucket.map((item, i) => {
          return (
            <DropCard
              onClick={() => handleChange(!deleted[i], i)}
              className={deleted[i] && "delete-drop-card"}
            >
            <CloseSVGContainer className={deleted[i] && "delete-svg-container-tick"}>
              <CloseSVG viewBox="0 0 12 10" className={deleted[i] && "delete-svg-tick"}>
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </CloseSVG>   
            </CloseSVGContainer> 
            
              <img
                src={item.media && item.media[0].url}
                className={"drop-img"}
                alt={item.title}
              />
            </DropCard>
          );
        })}
      </Final4Grid>
      <h1
        className={"h1-large"}
        style={{ fontSize: "32px", textAlign: "center" }}
      >
        Keep all or remove with a tap!
      </h1>
    </ReswipeCard>
  );
}
