import React, { useCallback, useState, useRef, useEffect } from "react";
import "./gallery.css";
import FastAverageColor from "fast-average-color";
import ImageZoom from "react-medium-image-zoom";
import ReactFullpage from "@fullpage/react-fullpage";
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";


const Gallery = (value, index) => {
    const fileType = index === 4 ? 'gif' : 'jpg';
    const url = `./magazine-cover/m${index + 1}.${fileType}`;
    const styles = { backgroundColor: '#1a1a1a' };

    return (
        <div key={index} className="listItem section" style={styles}>
            <div className="gallery_section">
                <ImageZoom
                    image={{
                        src: url,
                        alt: "Golden Gate Bridge",
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
                <button className="gallery_buybtn"> Buy for 1Ξ </button>
            </div>


        </div>
    );
};

const avgColorPromiseList = (value, index) => {
    const fac = new FastAverageColor();
    const urls = [
        `./magazine-cover/m1.jpg`,
        `./magazine-cover/m2.jpg`,
        `./magazine-cover/m3.jpg`,
        `./magazine-cover/m4.jpg`,
        `./magazine-cover/m5.gif`
    ];
    const promiseList = urls.map((url) => {
        return fac.getColorAsync(url);
    });

    return Promise.all(promiseList);
};

const MagGallery = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        avgColorPromiseList().then((values) => {
            setData(values);
        });
    }, []);
    return (
        <div className="mag-gallery">
            <FixedHeader {...props} isMagGallery={true} />
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
};
export default MagGallery;
