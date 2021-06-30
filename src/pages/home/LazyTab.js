import React from 'react'
import styled from "styled-components";
import "./lazyCard.css"

const TabsWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  width: var(--card-container-width);
  color: #ebeae8;
  padding: 6px 10px;
  margin: 0;
  margin-bottom: var(--gap-bottom);
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 50%),
    inset 0 -1px 2px rgb(0 0 0 / 50%), inset 0 -3px 0 rgb(37 37 37 / 50%),
    inset 0 2px 4px rgb(0 0 0 / 50%), 0 3px 2px rgb(0 0 0 / 13%);
  border-radius: 22px;
  justify-content: space-evenly;
  background-clip: text;
  -webkit-background-clip: text;
  list-style: none;
  text-transform: capitalize;
  .tab-selected {
    background: linear-gradient(
      135deg,
      #239bae,
      #6d8ad7 41%,
      #9d6dd7 72%,
      #d76db2
    );
    background-clip: text;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    -webkit-text-fill-color: transparent;
    border: none;
    -webkit-background-clip: text;
  }
`;

const LazyTab = () => {
    return (
        <TabsWrapper>
            {[1,2,3,4].map(t => (
                <div className="stripe extra-small-stripe"></div>
            ))}
        </TabsWrapper>
    )
}

export default LazyTab
