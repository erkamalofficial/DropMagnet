import React, { useRef, useState } from 'react'
import InstaIcon from "../../assets/insta-icon.png"
import TwitterIcon from "../../assets/twitter-icon.png"
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '../../components/elements/Avatar/Avatar'
import LoadingModal from '../../components/elements/LoadingModal/LoadingModal';
import { useUpdateUserProfileDetailsMutation, useUpdateUserProfilePictureMutation } from '../../store/api/DropApi';
import * as DropMagnetAPI from "../../DropMagnetAPI";
import { getInitials } from '../../utils';
import Modal from '../../components/elements/Modal/Modal';
import TextField from '../../components/elements/TextField/TextField';

export const UserDetails = ({ userProfile, detailView }) => {
    const [updateUserProfileDetails, { isLoading, isSuccess }] = useUpdateUserProfileDetailsMutation();
    const [updateUserProfilePicture] = useUpdateUserProfilePictureMutation();
    const [editableInputVal, setEditableInputVal] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);

    const [uploading, setUploading] = useState(false)
    const [cropModal, setCropModal] = useState(false)
    const [bufferImg, setBufferImg] = useState(null)
    const profilePic = useRef(null)

    const updateUserDetails = async () => {
        console.log('updateUserDetails', editableInputVal)
        if (editableInputVal.field === 'username') {
            if (editableInputVal.value.split(' ').length > 1) {
                alert("Username cannot have space.")
                return
            }
        }
        if (editableInputVal.value === undefined) {
            return;
        }

        if (editableInputVal.value === userProfile[editableInputVal.field]) {
            alert(`It is same as previous ${editableInputVal.field}. Try new one.`)
            return;
        }
        updateUserProfileDetails({ field: editableInputVal.field, value: editableInputVal.value, userId: userProfile.id }).then(() => {
            setOpenEditModal(false)
            setEditableInputVal(null)
        })
    }

    return (
        <>
            {isLoading && (
                <LoadingModal label="Updating...." />
            )}
            <div className="profile-detail-container" style={{ display: `${detailView ? "none" : "flex"}` }} >
                <div className="acc-profile-pic">
                    <Avatar
                        userImage={userProfile.avatar_url}
                        initial={getInitials(userProfile.name)}
                        picRef={profilePic}
                        cropModal={cropModal}
                        setCropModal={setCropModal}
                        setUploading={setUploading}
                        uploading={uploading}
                        onChange={(file, img) => {
                            updateUserProfilePicture({ file, userId: userProfile.id, bufferImg: img }).then(() => {
                                setCropModal(false)
                                setUploading(false)
                            })
                        }}

                        onRemove={() => {
                            updateUserProfilePicture({ file: null, userId: userProfile.id })
                        }}
                    />
                    <div className="edit-btn"
                        onClick={() => profilePic.current.click()}>
                        <EditIcon className="svg-icon" />
                    </div>
                </div>
                <div className="profile-large-title clickable"
                    onClick={() => {
                        setEditableInputVal({ field: "name", title: 'Full Name', value: userProfile.name, placeholderText: 'Enter your Full Name' });
                        setOpenEditModal(true)
                    }}
                >
                    {`${userProfile.name || ''}`}
                </div>
                <div className="profile-handle-title clickable"
                    onClick={() => {
                        setEditableInputVal({ field: "username", title: 'Username', value: userProfile.username, placeholderText: 'Enter a username' });
                        setOpenEditModal(true)
                    }}
                >
                    {`@${userProfile.username}`}
                </div>
                <div style={{ display: "flex", paddingBottom: "16px" }}>
                    <div style={{ display: "flex", paddingRight: "24px", cursor: "pointer", }}
                        onClick={() => {
                            setEditableInputVal({ field: "twitter_url", title: 'Twitter Handle', value: userProfile.twitter_url, placeholderText: 'Enter your Twitter Handle' });
                            setOpenEditModal(true)
                        }}
                    >

                        <img width={37} height={24} src={TwitterIcon} style={{ paddingRight: "8px" }} alt="/" />
                        <div className="profile-medium-title">
                            {userProfile && userProfile.twitter_url.length > 8 ? (
                                <div className="socialHandle">
                                    @
                                    <p className="truncate">
                                        {userProfile.twitter_url.substring(0, userProfile.twitter_url.length - 4)}
                                    </p>
                                    <p className="last">
                                        {userProfile.twitter_url.substring(userProfile.twitter_url.length - 4)}
                                    </p>
                                </div>
                            ) : userProfile.twitter_url.length <= 8 ? (
                                <p>@{userProfile.twitter_url}</p>
                            ) : (
                                <p>Add Twitter</p>
                            )}
                        </div>
                    </div>
                    <div style={{ display: "flex", cursor: "pointer" }}
                        onClick={() => {
                            setEditableInputVal({ field: "insta_url", title: 'Instagram Handle', value: userProfile.insta_url, placeholderText: 'Enter your Twitter Handle' });
                            setOpenEditModal(true)
                        }}
                    >
                        <img width={24} height={24} src={InstaIcon} alt="/" />
                        <div
                            className="profile-medium-title"
                            style={{ marginLeft: "10px" }}
                        >
                            {userProfile && userProfile.insta_url.length > 8 ? (
                                <div className="socialHandle">
                                    @
                                    <p className="truncate">
                                        {userProfile.insta_url.substring(0, userProfile.insta_url.length - 4)}
                                    </p>
                                    <p className="last">
                                        {userProfile.insta_url.substring(userProfile.insta_url.length - 4)}
                                    </p>
                                </div>
                            ) : userProfile.insta_url.length <= 8 ? (
                                <p>@{userProfile.insta_url}</p>
                            ) : (
                                <p>Add Instagram</p>
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className="profile-bio-edit-button clickable"
                    onClick={() => {
                        setEditableInputVal({ field: "bio", title: 'Your Bio', value: userProfile.bio, placeholderText: 'Tell us about your self (max 300 words)' });
                        setOpenEditModal(true)
                    }}
                >
                    {userProfile.bio ? userProfile.bio : "Tap to Add Bio"}
                </div>
            </div>

            {openEditModal &&
                <Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}>
                    <TextField
                        setInputValue={(val) => setEditableInputVal({ ...editableInputVal, value: val })}
                        title={editableInputVal.title}
                        titleTopMargin={"24px"}
                        value={editableInputVal.value}
                        placeholder={editableInputVal.placeholderText}
                    />
                    <div
                        className={"main-button-container"}
                        style={{ textAlign: "center" }}
                    >
                        <button className="main-button" onClick={updateUserDetails}>
                            {"Save"}
                        </button>
                    </div>
                </Modal>
            }
        </>
    )
}
