import React, { useState, useEffect } from "react";
import "./CategoryMenu.css";
import { Link } from 'react-router-dom';
import '../../../css/buttons.css'

export default function CategoryMenu(props) {

  const [selectedButton, setSelectedButton] = useState("Art")
  const [viewIsHidden, setViewIsHidden] = useState(false)

  useEffect(() => {
    setViewIsHidden(props.hidden)
  }, [props.hidden])

  return (
    <div>
    {viewIsHidden ? 
      <></>
      : 
      <div className="category-menu">
        <button className={selectedButton === "Art" ? "category-button-selected" : "category-button-unselected"} onClick={() => {setSelectedButton("Art"); props.changeCategory("Art")}}>Art</button>
        <button className={selectedButton === "Music" ? "category-button-selected" : "category-button-unselected"} onClick={() => {setSelectedButton("Music"); props.changeCategory("Music")}}>Music</button>
        <button className={selectedButton === "Collectibles" ? "category-button-selected" : "category-button-unselected"} onClick={() => {setSelectedButton("Collectibles"); props.changeCategory("Collectibles")}}>Collectibles</button>
        <button className={selectedButton === "Fashion" ? "category-button-selected" : "category-button-unselected"} onClick={() => {setSelectedButton("Fashion"); props.changeCategory("Fashion")}}>Fashion</button>
      </div>
    }
    </div>
  );
}