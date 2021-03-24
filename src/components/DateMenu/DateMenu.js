import React, { useState, useEffect } from 'react'
import "./DateMenu.css"

export default function DateMenu(props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  function closeMenu() {
    props.setOpen(false)
  }

  let menuClass = open ? "main-menu-open" : "main-menu-closed"

  return (
    <div className={menuClass}>
      <div className="close-button-holder">
        <img onClick={() => closeMenu()} className="close-button" src="./close-icon.png" />
      </div>
    </div>
  );
}
