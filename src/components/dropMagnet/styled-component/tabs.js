import styled from "styled-components";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export const StyledTab = styled(Tab)`
    cursor: pointer;
    color: #eaeaea;
    font-size: 24px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    margin: 5px 9px;
    min-width: fit-content;
    &.react-tabs__tab--selected{
    text-decoration: underline;
    background: transparent;
    border: none;
    color: #eaeaea;
    border-radius: 0;
    }
`;

export const StyledTabs = styled(Tabs)`
    width: 100%;
`;

export const StyledTabList = styled(TabList)`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style-type: none;
    margin-bottom: 62px;
    flex-wrap: wrap;
    padding: 0;
`;

export const StyledTabPanel = styled(TabPanel)`

`;
