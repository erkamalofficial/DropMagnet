import React, { useCallback, useState, useRef, useEffect } from "react";
import "./gallery.css";
import FastAverageColor from "fast-average-color";
import ImageZoom from "react-medium-image-zoom";
import ReactFullpage from "@fullpage/react-fullpage";

const Gallery = (value, index) => {
    const url = `./magazine-cover/m${index + 1}.jpg`;
    const styles = { backgroundColor: value.hex };

    return (
        <div key={index} className="listItem section" style={styles}>
            <div className="constent-section mag-content-section">
                <ImageZoom
                    image={{
                        src: url,
                        alt: "Golden Gate Bridge",
                        className: "artPic",
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
            </div>
            <div className="mag-gallery-footer">
                <div className="mag-gallery-date"> April 14th 2020 </div>
                <button className="buyBtn"> Buy for 1E </button>
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
    ];
    const promiseList = urls.map((url) => {
        return fac.getColorAsync(url);
    });

    return Promise.all(promiseList);
};

export default function App() {
    const [data, setData] = useState([]);
    useEffect(() => {
        avgColorPromiseList().then((values) => {
            setData(values);
        });
    }, []);
    return (
        <div className="mag-gallery">
            {data.length > 0 && (
                <div className="main">
                    <div className="header mag-header">
                        <span>Mag.Link/TIME</span>
                    </div>
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
