import React, { useState, useEffect } from 'react'
import "./DateMenu.css"
import DateCell from '../../elements/DateCell/DateCell'
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { Menu, ArrowLeft, ArrowRight } from '../../elements/DateDragBarComponent/DateDragBarComponent'

export default function DateMenu(props) {
  const [open, setOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState('April')
  
  function onSelect(key) {
    setSelectedMonth(key)
  }

  // list of items
  const list = [ 
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
      date: 1617985941,
      arts: 1,
      music: 1,
      collectible: 1,
      fashion: 1
    },
    {
      date: 1618072341,
      arts: 19,
      music: 1,
      collectible: 1,
      fashion: 0
    },
    {
      date: 1618158741,
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
      <h1 style={{margin: '24px auto', textAlign: 'center'}}>Select a Drop Date</h1>
      <div className="date-menu-holder">
        <ScrollMenu
            style={{boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.5)', backgroundColor: 'rgba(19, 19, 19, 0.56)', marginBottom: '14px'}}
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
