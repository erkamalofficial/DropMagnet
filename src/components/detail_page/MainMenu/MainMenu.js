import React, { useState, useEffect } from 'react'
import "./MainMenu.css"
import { Link } from 'react-router-dom'

export default function MainMenu(props) {
  const [open, setOpen] = useState(false)

  var menuList = [
    {title: "Create a Drop", link: 'create_drop'},
    {title:"Get drop token", link: "/getToken"}, 
    {title:"About",link:'/about'}, 
    {title:"What's a drop?",link:'/aboutDrop'},
    {title: "Terms and Conditions",link: "/term"},
    {title: "Logout", link: "/logout"}
  ]

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

  function renderMenuItem(item,index) {
    return  <Link className="main-menu-item" style={{marginBottom: '16px'}} key={index} to={item.link}>{item.title}</Link>

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
        {menuList.map(renderMenuItem)}
      </div>
    </div>
  );
}
