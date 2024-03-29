import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import "./Avatar.css";
import CropModal from "./CropModal";
import { useAuth } from "../../../contexts/FirebaseAuthContext";
import CloseIcon from "../../../assets/close-icon.png"
import { useSelector } from "react-redux";

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
    height: 32px
  }
`;

export const InitialsOfUser = ({ initial }) => {
  return (
    <InitialCircle>
      <span>{initial}</span>
    </InitialCircle>
  );
};

function Avatar({
  userImage,
  style,
  setCropModal,
  cropModal,
  setUploading,
  uploading,
  initial,
  view_only,
  small,
  onRemove,
  onChange,
  picRef,
  userId
}) {
  const { userId: user_id } = useSelector((state) => state.auth);
  const [img, setImg] = useState(null)
  const cont_style = style ? style : {};

  const history = useHistory()

  const openUser = (e) => {
    if (userId && user_id !== userId) {
      history.push(`/profile/${userId}`)
    }
  }

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImg(fileReader.result);
      setCropModal(true)
    };
    fileReader.readAsDataURL(e.target.files[0]);
  }


  return (
    <div className={"avatar-container " + (small ? "small-avatar" : "")} style={cont_style}>

      {cropModal &&
        <CropModal
          img={img}
          setImg={setImg}
          setCropModal={setCropModal}
          onChange={onChange}
          setUploading={setUploading}
          uploading={uploading}
        />}

      {userImage && !view_only && (
        <span className={"delete-button"} onClick={onRemove}>
          <img
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            alt={"remove-btn"}
            src={CloseIcon}
          />
        </span>
      )}

      <label
        className={"avatar-img-uploader " + (small ? "small-avatar-label" : "")}>
        {userImage && initial ? (
          <img
            className={"avatar-img"}
            alt={"profile-edit"}
            src={userImage ? userImage : "./add-user-icon.png"}
            onClick={openUser}
          />
        ) : (
          <InitialsOfUser initial={initial} />
        )}
      </label>

      {!view_only && (
        <input
          type="file"
          accept={"image/jpeg, image/png, image/jpg"}
          onChange={(e) => handleChange(e)}
          hidden
          value={null}
          ref={picRef}
        />
      )}
    </div>
  );
}

export default Avatar;
