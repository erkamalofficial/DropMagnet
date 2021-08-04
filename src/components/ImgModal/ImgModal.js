import React from 'react'
import "./imgModal.css"

const ImgModal = ({source, setImgModal}) => {
    return (
        <div className="img-modal">
            <button onClick={() => setImgModal(false)}>
                <img src="./close-icon.png" alt="/" />
            </button>
            <img src={source} alt="/"/>
        </div>
    )
}

export default ImgModal
