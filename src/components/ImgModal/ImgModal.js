import React from 'react'
import "./imgModal.css"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ImgModal = ({ sourceIdx, setImgModal, medias }) => {

    const settings = {
        initialSlide: sourceIdx,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        draggable: false,
        dontAnimate: true
    }

    return (
        <div className="img-modal">
            <button
                className="close-btn"
                onClick={() => setImgModal(false)}>
                <img src="./close-icon.png" alt="/" />
            </button>
            <div className="media-slider-container">
                <Slider {...settings}>
                    {
                        medias.map((img, index) => {
                            return (
                                <div className="full-img-cont">
                                    <img src={img.url} alt="/"
                                    onClick={() => setImgModal(false)} />
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>


        </div>
    )
}

export default ImgModal
