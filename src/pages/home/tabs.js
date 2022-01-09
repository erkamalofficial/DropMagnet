import { memo } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const TabsWrapper = styled.ul`
display: flex;
flex-direction: row;
width: var(--card-container-width);
height: 37px;
color: #ebeae8;
padding: 6px 10px;
margin: 0;
margin-bottom: 16px;
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
.first-position {
  color: #ebeae8;
  position:relative;
}
.first-position::before {
  content:"";
  position: absolute;
  width: 150%;
  top:-5px;
  left: -14px;
  right: 19px;
  bottom: -4px;
  border-radius:50px;
  border: 0.75px solid transparent; 
  background:linear-gradient(135deg,
    #ff00c7,
    #6c00ff
    ) border-box;
  -webkit-mask:
   linear-gradient(#fff 0 0) padding-box, 
   linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
}
.tab-underline {
  border-bottom: 0.75px solid #ebeae8;;
  border-color: 
}
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


const Tabs = ({ activeTabIndex, handleActiveTabIndex, tabList2 }) => {

  const allCategories = useSelector(state => state.category.allCategories)

  return (
    <TabsWrapper>
      {allCategories && allCategories.external_creators.map((x) => (
        <TabItem
        key={x.position}
        onClick={() => handleActiveTabIndex(x.position)}
        className={ `${activeTabIndex === (x.position) ? "tab-selected" : x.position === 4 ? "first-position" : "" }`}
      >
        {x.name}
      </TabItem>
      ))}
      {allCategories && allCategories.categories.map((x) => (
        <TabItem
        key={x.position}
        onClick={() => handleActiveTabIndex(x.position)}
        className={activeTabIndex === x.position ? "tab-selected" : ""}
      >
        {x.name}
      </TabItem>
      ))}

      
    </TabsWrapper>
  );
};

export default memo(Tabs);
