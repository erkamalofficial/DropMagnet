import React from "react";
import "./DropCell.css";
import { Link } from 'react-router-dom';

export default function DropCell(props) {

  function renderDrop() {
    return <div key={props.drop.drop_id} className="landing-cell" onClick={props.onClick}>
      <div className="drop-inner">
        <div className="drop-details">
          <div className="drop-header">
            <img className="drop-artist-image" src={props.drop.artist_image}/>
            <div className="drop-header-title" >{props.drop.artist}</div>
          </div>
          <div className="drop-name">{props.drop.title}</div>
          <div className="drop-date">{props.drop.drop_date}</div>
          <div className="drop-footer">
            <div className="drop-marketplace-title">{props.drop.marketplace}</div>
            <div className="drop-category-title">{props.drop.category}</div>
          </div>
        </div>
        <img className="drop-image" src={props.drop.drop_image}/>
      </div>
    </div>
  }


  return (
    <div>
      {/* <Link to={''props.drop} > */}
        {renderDrop()}
      {/* </Link> */}
    </div>
  );
}