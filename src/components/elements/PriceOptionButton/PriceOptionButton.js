import "./PriceOptionButton.css"
import { useState, useEffect } from "react"

export default function PriceOptionButton(props) {

  return (
    <div>
      {props.buttonType === 'auction' ?
        <div onClick={() => props.setOptionSelected()} className={props.isSelected ? "price-option-button-holder-selected" : "price-option-button-holder"}>
          <img width={77} height={77} src="./auction-icon.png" style={props.isSelected ? {} : {filter: 'invert(50%) sepia(2%) saturate(9%) hue-rotate(331deg) brightness(92%) contrast(94%)'}} />
          <p2 style={{fontWeight: 'bold', paddingTop: '12px', color: props.isSelected ? '#EAEAEA' : '#777777'}}>Auction</p2>
        </div>
      :
        <div onClick={() => props.setOptionSelected()} className={props.isSelected ? "price-option-button-holder-selected" : "price-option-button-holder"}>
          <img width={77} height={77} src="./fixed-price.png" style={props.isSelected ? {} : {filter: 'invert(50%) sepia(2%) saturate(9%) hue-rotate(331deg) brightness(92%) contrast(94%)'}} />
          <p2 style={{fontWeight: 'bold', paddingTop: '12px', color: props.isSelected ? '#EAEAEA' : '#777777'}}>Set Price</p2>
        </div>
      }
    </div>
  )
}