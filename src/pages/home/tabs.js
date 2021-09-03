import { memo } from "react";
import styled from "styled-components";

const TabsWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  width: var(--card-container-width);
  height: 37px;
  color: #ebeae8;
  padding: 6px 10px;
  margin: 0;
  margin-bottom: var(--gap-bottom);
  background-image: linear-gradient(
    #181818,
    #131313 83%,
  );
  border: 0.75px solid black;
  border-radius: 22px;
  justify-content: space-evenly;
  align-items: center;
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
    border-bottom: 1px solid #252525;
    padding 3px 0 2px 0;
  }
`;
const TabItem = styled.li`
  border: none;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  outline: none;
  cursor: pointer;
  background-clip: text;
  -webkit-background-clip: text;
  font-family: 'Azo Sans';
  margin-bottom: -3px;
  font-weight: 400;
  margin-right: 18px;
  margin-left: 18px
`;
const Tabs = ({ activeTabIndex, handleActiveTabIndex, tabList }) => {
  return (
    <TabsWrapper>
      {tabList.map((title, index) => (
        <TabItem
          key={index}
          onClick={() => handleActiveTabIndex(index)}
          className={activeTabIndex === index ? "tab-selected" : ""}
        >
          {title}
        </TabItem>
      ))}
    </TabsWrapper>
  );
};

export default memo(Tabs);
