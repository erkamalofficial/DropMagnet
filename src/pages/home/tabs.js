import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const TabsWrapper = styled.ul`
@media (max-width: 500px) {
  height: 36px;
}
background: #000;
display: flex;
flex-direction: row;
width: var(--tab-container-width);
height: 64px;
color: #ebeae8;
padding: 0 28px;
overflow:hidden;
overflow-x: scroll;
margin: 0;
border-top: 0.75px solid black;
border-bottom: 0.75px solid black;
white-space: nowrap;
justify-content: space-between;
align-items: center;
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
.first-position-selected {
  color: transparent;
  position:relative;
}
.first-position-selected::before {
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
  border-bottom: 1px solid white;
  padding: 0;
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
  margin-left: 18px;
  height: 96%;
  display: flex;
  align-items: center;
`;


const Tabs = ({ activeTabIndex, handleActiveTabIndex, tabList2 }) => {

  const allCategories = useSelector(state => state.category.allCategories)

  return (
    <TabsWrapper >
      {allCategories && allCategories.external_creators.map((x,i) => (
        <TabItem
        key={x.position}
        onClick={() => handleActiveTabIndex(i+4)}
        className={ `${activeTabIndex === (i+4) ? "tab-selected" : "" }`}
      >
        {x.name}
      </TabItem>
      ))}
      {allCategories && allCategories.categories.map((x, id) => (
        <TabItem
        key={id}
        onClick={() => handleActiveTabIndex(id)}
        className={activeTabIndex === id ? "tab-selected" : ""}
      >
        {x.name}
      </TabItem>
      ))}

      
    </TabsWrapper>
  );
};

export default Tabs;
