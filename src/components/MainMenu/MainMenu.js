import React, { useState, useEffect } from 'react'
import "./MainMenu.css"
import { Link } from 'react-router-dom'

export default function MainMenu(props) {
  const [open, setOpen] = useState(false)

  var menuList = ["Get drop token", "About", "What's a drop?"]

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  function closeMenu() {
    props.setOpen(false)
  }

  function openItem(item) {
    props.openItem(item)
    props.setOpen(false)
  }

  function renderMenuItem(item) {
    return <div onClick={() => openItem(item)}>
      <h1 className="main-menu-item">{item}</h1>
    </div>
  }

  let menuClass = open ? "main-menu-open" : "main-menu-closed"

  return (
    <div className={menuClass}>
      <div className="close-button-holder">
        <img onClick={() => closeMenu()} className="close-button" src="./close-icon.png" />
      </div>
      <div className="menu_mobile">
        { props.userDetails !== {} && props.userDetails !== undefined ?
          <div className="main-menu-header">
            <p1 style={{color: 'white', fontWeight: 'bold'}}>{props.userDetails.name}</p1>
            <p2 style={{color: 'white'}}>@{props.userDetails.handle}</p2>
          </div>
          :
          <></>
        }
        <Link className="main-menu-item" to={`/create_drop`}>Create a drop</Link>
        {menuList.map(renderMenuItem)}
        <Link className="main-menu-item" to={`/terms`}>Terms and Conditions</Link>
      </div>
    </div>
  );
}
