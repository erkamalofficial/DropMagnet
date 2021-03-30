import React, { useState, useEffect } from "react";
import "./DateCell.css";
import { Link } from 'react-router-dom';

export default function DateCell(props) {

  function renderDate() {
    return <div className="date-cell-style" onClick={() => props.setSelectedDate(props.day)}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div className="date-cell-title">{props.day.date}</div>
        <div className="date-cell-title">{props.day.arts + props.day.music + props.day.collectible + props.day.fashion} Drops</div>
      </div>
      <div style={{display: 'flex', paddingTop: "12px"}}>
        <div className="date-cell-detail">{props.day.arts} Art</div>
        <div className="date-cell-detail">{props.day.music} Music</div>
        <div className="date-cell-detail">{props.day.collectible} Collectible</div>
        <div className="date-cell-detail">{props.day.fashion} Fashion</div>
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