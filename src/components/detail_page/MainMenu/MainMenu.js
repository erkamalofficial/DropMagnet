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
    return <div onClick={() => openItem(item)} style={{marginTop: '16px'}}>
      <h1 style={{margin: 'auto', marginBottom: '16px'}} className="main-menu-item">{item}</h1>
    </div>
  }

  let menuClass = open ? "main-menu-open" : "main-menu-closed"

  return (
    <div className={menuClass}>
      <div className="close-button-holder">
        <img onClick={() => closeMenu()} className="close-button" src="./close-icon.png" />
      </div>
      <div className="main-menu-holder">
        { props.userDetails !== {} && props.userDetails !== undefined ?
          <div className="main-menu-header">
            <p1 style={{fontWeight: 'bold'}}>{props.userDetails.name}</p1>
            <p2 style={{paddingTop: '4px'}}>@{props.userDetails.handle}</p2>
          </div>
          :
          <></>
        }
        <Link className="main-menu-item" style={{marginBottom: '16px'}} to={`/create_drop`}>Create a drop</Link>
        {menuList.map(renderMenuItem)}
        <Link className="main-menu-item" style={{marginBottom: '16px'}} to={`/terms`}>Terms and Conditions</Link>
      </div>
    </div>
  );
}
