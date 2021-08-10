import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import "./Avatar.css";
import CropModal from "./CropModal";
import { useAuth } from "../../../contexts/FirebaseAuthContext";


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


  const [img, setImg] = useState(null)
  const cont_style = style ? style : {};

  const history = useHistory()
  const { currentUser } = useAuth();

  const openUser = (e) => {
    const user_id = currentUser.uid;
    if (user_id !== userId) {
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
            src="./close-icon.png"
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
