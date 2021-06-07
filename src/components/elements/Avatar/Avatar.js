import React from "react";
import "./Avatar.css";
function Avatar({ userImage, onRemove, onChange }) {
  return (
    <div className={"avatar-container"}>
      {userImage && (
        <span className={"delete-button"} onClick={onRemove}>
          <img
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            alt={"remove-btn"}
            src="./close-icon.png"
          />
        </span>
      )}

      <label for={"avatar-img-uploader"}>
        <img
          className={"avatar-img"}
          alt={"profile-edit"}
          src={userImage ? userImage : "./add-user-icon.png"}
        />
      </label>
      <input
        type={"file"}
        accept={"image/jpeg, image/png"}
        hidden
        value={null}
        id={"avatar-img-uploader"}
        onChange={onChange}
      />
    </div>
  );
}

export default Avatar;
