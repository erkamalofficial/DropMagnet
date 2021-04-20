import React, { useCallback, useState, useRef, useEffect } from "react";
import "./gallery.css";
import FastAverageColor from "fast-average-color";
import ImageZoom from "react-medium-image-zoom";
import ReactFullpage from "@fullpage/react-fullpage";
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";
import BuyBtn from '../../components/blocks/buy-btn';
import { getDominantColorFromImages } from '../../utils';


const Gallery = ({ url, color }, index) => {
    const styles = { backgroundColor: color.hex, filter: "brightness(85%)" };
    let user = {
        "name": "Crypto Art Man",
        "handle": "cryptoartman",
        "bio": "The Drop From Space is a piece that signifies the launch of this incredible app — Drop Magnet! Designed by the lead designer of Drop Magnet, it’ll be available for auction on Crypto Art Man’s OpenSea page from this Friday onwards.",
        "image": "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg"
    }
    return (
        <div key={index} className="listItem section" style={styles}>
            <div className="gallery_section sq_gallery_section">
                <h3 className="gallery_title">Art title</h3>
                <ImageZoom
                    image={{
                        src: url,
                        className: "gallery_art",
                    }}
                    zoomImage={{
                        className: "artPiczoom",
                    }}
                    defaultStyles={{
                        overlay: {
                            backgroundColor: color.hex,
                        },
                    }}
                />
                <p className="gallery_desc">The Description goes here</p>
                <BuyBtn />
            </div>
        </div>
    );
};


const urls = [
    { id: 'img1', url: './square-gallery/s1.png' },
    { id: 'img2', url: './square-gallery/s2.gif' },
    { id: 'img3', url: './square-gallery/s3.jpg' },
    { id: 'img4', url: './square-gallery/s4.jpg' }
];

export default function SquareGallery(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        getDominantColorFromImages(urls).then((values) => {
            setData(values);
        });
    }, []);
    return (
        <div className="square-gallery">
            <FixedHeader {...props} />
            {data.length > 0 && (
                <div className="main">
                    <ReactFullpage
                        render={() => {
                            return data.map(Gallery);
                        }}
                    />
                </div>
            )}
        </div>
    );
}
