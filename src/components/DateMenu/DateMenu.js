import React, { useState, useEffect } from 'react'
import "./DateMenu.css"
import DateCell from '../DateCell/DateCell'
import ScrollMenu from 'react-horizontal-scrolling-menu';

// One item component
// selected prop will be passed
const MenuItem = ({ text, selected }) => {
  return (
    <div
      className="menu-item"
    >
      {text}
    </div>
  );
};

// All items component
// Important! add unique key
export const Menu = (list) => list.map(el => {
  const { name } = el;

  return (
    <MenuItem
      text={name}
      key={name}
    />
  );
});


const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};

const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

export default function DateMenu(props) {
  const [open, setOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(0)
  
  function onSelect(key) {
    setSelectedMonth(key)
  }

  // list of items
  const list = [  { name: 'March' },
  { name: 'April' },
  { name: 'May' },
  { name: 'June' },
  { name: 'July' },
  { name: 'August' },
  { name: 'September' },
  { name: 'October' },
  { name: 'November' }]

  const days = [
    {
      date: "20-03-2021",
      arts: 1,
      music: 1,
      collectible: 1,
      fashion: 1
    },
    {
      date: "21-03-2021",
      arts: 19,
      music: 1,
      collectible: 1,
      fashion: 0
    },
    {
      date: "22-03-2021",
      arts: 0,
      music: 2,
      collectible: 5,
      fashion: 4
    }
  ]

  useEffect(() => {

  }, [])

  useEffect(() => {

  }, [selectedMonth])

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  function closeMenu() {
    props.setOpen(false)
  }

  function renderDateCell(date) {
    return <DateCell day={date} setSelectedDate={() => {props.setSelectedDate(date); closeMenu()}}/>
  }

  let menuClass = open ? "main-menu-open" : "main-menu-closed"

  const menu = Menu(list, selectedMonth)

  return (
    <div className={menuClass}>
      <div className="close-button-holder">
        <img onClick={() => closeMenu()} className="close-button" src="./close-icon.png" />
      </div>
      <div className="date-menu-holder">
        <ScrollMenu
            style={{boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.5)', backgroundColor: 'rgba(19, 19, 19, 0.56)'}}
            data={menu}
            arrowLeft={ArrowLeft}
            arrowRight={ArrowRight}
            selected={selectedMonth}
            onSelect={onSelect}
          />
        {days.map(renderDateCell)}
      </div>
    </div>
  );
}
