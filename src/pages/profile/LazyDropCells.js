import React from 'react'
import FadeIn from 'react-fade-in'

const LazyDropCells = () => {

    return (
        <div className="drop-list">
            {[1, 2, 3].map(d => (
                <div key={d} className="landing-cell lazy">
                    <div className="drop-inner">
                        <div className="drop-details">
                            <div className="drop-header" >
                                <div className="basic small-round-profile-basic"></div>
                                <div className="basic drop-artist-basic" ></div>
                            </div>
                            <div className="basic drop-title-basic"></div>
                            <div className="basic date-basic"></div>
                            <div className="drop-footer">
                                <p2 className="basic tag-basic"></p2>
                                <p2 className="basic tag-basic"></p2>
                                <p2 className="basic tag-basic"></p2>
                            </div>
                        </div>
                        <div className="basic drop-image-basic" />
                    </div>
                </div>
            ))}
        </div>
    )

}

export default LazyDropCells
