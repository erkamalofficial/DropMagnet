import React from 'react'
import { createPortal } from 'react-dom';
import "./imgModal.css"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
    createPortal(
      <div className="img-modal">
        <button
          className="close-btn"
          onClick={() => setImgModal(false)}>
          <img src="./close-icon.png" alt="/"/>
        </button>
        <div className="media-slider-container">
          <Slider {...settings}>
            {
              medias.map((img, index) => {
                return (
                  <div className="full-img-cont">
                    <TransformWrapper
                      initialScale={1}
                    >
                      {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                        <div className="zoom-pane">
                          {/* <div className="zoom-tools">
                                                    <button onClick={() => zoomIn()}>+</button>
                                                    <button onClick={() => zoomOut()}>-</button>
                                                    <button onClick={() => resetTransform()}>x</button>
                                                </div> */}
                          <TransformComponent>
                            <div className="img-el">
                              <img src={img.url} alt="/" onClick={() => setImgModal(false)}/>
                            </div>
                          </TransformComponent>
                        </div>
                      )}
                    </TransformWrapper>
                  </div>
                )
              })
            }
          </Slider>
        </div>
      </div>,
      document.querySelector('#root')
    )
  )
}

export default ImgModal
