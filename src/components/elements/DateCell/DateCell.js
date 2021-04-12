import React, { useState, useEffect } from "react";
import "./DateCell.css";
import { Link } from 'react-router-dom';
import { epochToDayMonth } from "../../../helpers/DateFormatter";

export default function DateCell(props) {

  function renderDate() {
    return <div className="date-cell-style" style={props.cellSelected ? {background: '#E2E5E7'} : {}} onClick={() => props.setSelectedDate(props.day)}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div className="date-cell-title" style={props.cellSelected ? {color: '#0F4DA9'} : {}}>{epochToDayMonth(props.day.date)}</div>
        <div className="date-cell-title" style={props.cellSelected ? {color: '#0F4DA9'} : {}}>{props.day.arts + props.day.music + props.day.collectible + props.day.fashion} Drops</div>
      </div>
      <div style={{display: 'flex', paddingTop: "12px"}}>
        <div className="date-cell-detail" style={props.cellSelected ? {color: '#0F4DA9'} : {}}>{props.day.arts} Art</div>
        <div className="date-cell-detail" style={props.cellSelected ? {color: '#0F4DA9'} : {}}>{props.day.music} Music</div>
        <div className="date-cell-detail" style={props.cellSelected ? {color: '#0F4DA9'} : {}}>{props.day.collectible} Collectible</div>
        <div className="date-cell-detail" style={props.cellSelected ? {color: '#0F4DA9'} : {}}>{props.day.fashion} Fashion</div>
      </div>
    </div>
  }


  return (
    <div>
      {/* <Link to={''props.drop} > */}
        {renderDate()}
      {/* </Link> */}
    </div>
  );
}