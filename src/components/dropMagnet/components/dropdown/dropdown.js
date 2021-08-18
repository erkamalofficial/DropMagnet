import React, { useState } from "react";
import styled from "styled-components";
import arrowDown from "../../assets/arrowDown.png"

const DropDownWrapper = styled.div`
    position: absolute;
    top:8px;
    left:15px;
    z-index: 1000;
    @media (max-width: 375px) and (max-height: 700px) {
        top: 12px;
        left: 13px;
    }
`;
const DropDown = styled.div`
    min-width: 110px;
    height: 36px;
    background: #101010;
    border-radius: 100px;
    border: none;
    color: #d8d8d8;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: left;
    padding: 8px 30px 8px 12px;
    cursor:pointer;
    position:relative;
`;
const DropDownArrow = styled.div`
    position: absolute;
    right:10px;
    top:50%;
    bottom:50%;
    transform:translateY(-50%);
    border: none;
    background-image: url(${arrowDown});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 8px;
    width: 14px;
    transition: all 150ms ease;
    &.isOpen{
      top:40%;
      transition: all 150ms ease;
      transform: rotate(180deg);
    }
`;
const SelectedItem = styled.div`
    color: #d8d8d8;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: left;
`;
const Options = styled.div`
    color: #d8d8d8;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: left;
    padding: 4px;
    cursor:pointer;
`;
const DropDownMenu = styled.div`
    background: #101010;
    border-radius: 10px;
    display: none;
    padding: 4px 8px;
    &.open {
        display: block;
    }
`;

const Dropdown = ({data}) => {
    const [isOpen, setOpen] = useState(false);
    const [items] = useState(data);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDropdown = () => setOpen(!isOpen);

    const handleItemClick = (id) => {
        selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
        setOpen(false)
    }

    return (
        <DropDownWrapper>
            <DropDown onClick={toggleDropdown}>
                <SelectedItem>
                    {selectedItem ? items.find(item => item.id === selectedItem).label : "Select"}
                </SelectedItem>
                <DropDownArrow className={`${isOpen && 'isOpen'}`}/>
            </DropDown>
            <DropDownMenu className={`dropdown-body ${isOpen && 'open'}`}>
                {items.map(item => (
                    <Options key={item.id} onClick={() => handleItemClick(item.id)}>
                        {item.label}
                    </Options>
                ))}
            </DropDownMenu>
        </DropDownWrapper>
    )
}

export default Dropdown