import React, { useState, useEffect } from 'react'
import LinkIcon from '@material-ui/icons/Link';
import SaveIcon from '@material-ui/icons/Save';
import "./DropDetail.css"
import validUrl from 'valid-url'
import { CircularProgress } from '@material-ui/core';
import FadeIn from 'react-fade-in';

const DropLink = () => {

    const [link, setLink] = useState('')
    const [changed, setChanged] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (link !== "") {
            setChanged(true)
        }
        else {
            setChanged(false)
        }
    }, [link])

    useEffect(() => {
        if (saved) {
            setTimeout(() => {
                setSaved(false)
            }, 1200)
        }
    }, [saved])

    useEffect(() => {
        if(uploading && link!==' '){
            saveLink()
        }
    }, [uploading, link])

    const saveLink = () => {
        if (validUrl.isUri(link)) {
            setSaved(true)
            setUploading(false)
        }
        else {
            alert("Not an URL.")
            setUploading(false)
        }
    }

    return (
        <div className="paste-link">
            <div className={`saved-message ${saved ? 'show' : ''}`}>Drop link saved!</div>
            <div className="link-icon"><LinkIcon className="link-svg" /></div>
            <input
                value={link}
                onChange={(e) => {
                    setLink(e.target.value)
                    setChanged(true)
                }}
                placeholder="Place Link To Drop Here">
            </input>
            {changed && (
                <>
                    {!uploading ? (
                        <div className="link-icon" onClick={() => {
                            setUploading(true)}}>
                            <SaveIcon className="save-svg" />
                        </div>
                    ) : (
                        <div className="link-icon">
                            <CircularProgress size={20} color='white' />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default DropLink
