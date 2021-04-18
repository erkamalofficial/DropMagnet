import React, { useCallback, useState, useRef, useEffect } from "react";
import "./gallery.css";
import FastAverageColor from "fast-average-color";
import ImageZoom from "react-medium-image-zoom";
import ReactFullpage from "@fullpage/react-fullpage";
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";


const Gallery = (value, index) => {
    const url = `https://jariz.github.io/vibrant.js/examples/${index + 1}.jpg`;
    const styles = { backgroundColor: value.hex, filter: "brightness(85%)" };
    let user = {
        "name": "Crypto Art Man",
        "handle": "cryptoartman",
        "bio": "The Drop From Space is a piece that signifies the launch of this incredible app — Drop Magnet! Designed by the lead designer of Drop Magnet, it’ll be available for auction on Crypto Art Man’s OpenSea page from this Friday onwards.",
        "image": "https://pbs.twimg.com/profile_images/1378299017747165187/oKvJA363_400x400.jpg"
    }
    return (
        <div key={index} className="listItem section" style={styles}>
            <div className="gallery_section sq_gallery_section">

                <div className="header"> @CryptoArtMan </div>

                <h3 className="gallery_title">Art title</h3>
                <ImageZoom
                    image={{
                        src: url,
                        // alt: "Golden Gate Bridge",
                        className: "gallery_art",
                    }}
                    zoomImage={{
                        className: "artPiczoom",
                    }}
                    defaultStyles={{
                        overlay: {
                            backgroundColor: value.hex,
                        },
                    }}
                />
                <p className="gallery_desc">The Description goes here</p>
                <button className="gallery_buybtn"> Buy for 1Ξ </button>
            </div>
        </div>
    );
};

const avgColorPromiseList = (value, index) => {
    const fac = new FastAverageColor();
    const urls = [
        `https://jariz.github.io/vibrant.js/examples/1.jpg`,
        `https://jariz.github.io/vibrant.js/examples/2.jpg`,
        `https://jariz.github.io/vibrant.js/examples/3.jpg`,
        `https://jariz.github.io/vibrant.js/examples/4.jpg`,
    ];
    const promiseList = urls.map((url) => {
        return fac.getColorAsync(url);
    });

    return Promise.all(promiseList);
};

export default function SquareGallery(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        avgColorPromiseList().then((values) => {
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
