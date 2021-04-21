import React, { useCallback, useState, useRef, useEffect } from "react";
import "./gallery.css";
import FastAverageColor from "fast-average-color";
import ImageZoom from "react-medium-image-zoom";
import ReactFullpage from "@fullpage/react-fullpage";
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";
import { getDominantColorFromImages } from '../../utils';
import BuyBtn from '../../components/blocks/buy-btn';

const Gallery = ({ url, color }, index) => {
    return (
        <div key={index} className="section" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="gallery_section">
                <ImageZoom
                    image={{
                        src: url,
                        className: "gallery_art mag_art",
                    }}
                    zoomImage={{
                        className: "artPiczoom",
                    }}
                    defaultStyles={{
                        overlay: {
                            backgroundColor: "#000",
                        },
                    }}
                />
                {/* <div className="mag-gallery-date"> April 14th 2020 </div> */}
                <BuyBtn />
            </div>
        </div>
    );
};

const urls = [
    { id: 'img1', url: './magazine-cover/m1.jpg' },
    { id: 'img2', url: './magazine-cover/m2.jpg' },
    { id: 'img3', url: './magazine-cover/m3.jpg' },
    { id: 'img4', url: './magazine-cover/m4.jpg' },
    { id: 'img5', url: './magazine-cover/m5.gif' },
];

const MagGallery = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getDominantColorFromImages(urls).then((values) => {
            setData(values);
        });
    }, []);
    return (
        <div className="mag-gallery">
            <FixedHeader {...props} isMagGallery={true} />
            {data.length > 0 && (
                <div className="mag_main">
                    <ReactFullpage
                        render={() => {
                            return data.map(Gallery);
                        }}
                    />
                </div>
            )}
        </div>
    );
};
export default MagGallery;
