import React from "react";
import styled from "styled-components";
import "./Avatar.css";
const InitialCircle = styled.span`
  width: 100%;
  height: 100%;
  background-color: saddlebrown;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  & > span {
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 32px;
    color: #fff;
  }
`;

export const InitialsOfUser = ({ initial }) => {
  return (
    <InitialCircle>
      <span>{initial}</span>
    </InitialCircle>
  );
};

function Avatar({ userImage,style,file, initial, view_only, small, onRemove, onChange }) {
  const cont_style = style?style : {};
  console.log(cont_style);
  return (
    <div className={"avatar-container " + (small ? "small-avatar" : "")}  style={cont_style}>
      {userImage && !view_only && (
        <span className={"delete-button"} onClick={onRemove}>
          <img
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            alt={"remove-btn"}
            src="./close-icon.png"
          />
        </span>
      )}

      <label for={"avatar-img-uploader"} className={"avatar-img-uploader " + (small ? "small-avatar-label" : "")}> 
        {userImage && initial ? (
          <img
            className={"avatar-img"}
            alt={"profile-edit"}
            src={userImage ? userImage : "./add-user-icon.png"}
          />
        ) : (
          <InitialsOfUser initial={initial} />
        )}
      </label>
      {!view_only && (
        <input
          type={"file"}
          accept={"image/jpeg, image/png"}
          hidden
          id={"avatar-img-uploader"}
          onChange={onChange}
        />
      )}
    </div>
  );
}

export default Avatar;
