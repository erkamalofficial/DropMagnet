import React, { useState } from 'react'
import "./DropDetail.css"
import { formatDate } from '../../../helpers/DateFormatter'
import Avatar from '../../elements/Avatar/Avatar'
import { getInitials } from '../../../utils'
import { FormBtn } from '../../../pages/register/FormComponents'
import ImgModal from '../../ImgModal/ImgModal'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../../contexts/FirebaseAuthContext";
import DropLink from './DropLink'

export default function ProfileDropDetail(props) {

  const history = useHistory()
  const { currentUser } = useAuth();

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 2.4,
    slidesToScroll: 1,
    autoplay: false,
    draggable: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          infinite: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 680,
        settings: {
          infinite: false,
          slidesToShow: 1.5,
          slidesToScroll: 1,
        }
      },

    ]
  }

  const [imgModal, setImgModal] = useState(false)
  const [srcIndex, setSrcIndex] = useState(0)

  function closeDetail() {
    props.closeDetailView()
  }
  const { user } = props
  let artist_image = props.isSaved ? (props.drop.artist.avatar_url || "") : (user ? (user.avatar_url || "") : "")
  let artist_name = props.isSaved ? props.drop.artist.name : (user ? user.name : '')
  function renderMusicSideDetails() {
    return <div className="music-info-detail">
      <p2 style={{ color: '#F5F5F5', opacity: '0.66', fontWeight: 'bold', transform: 'rotate(-90deg)', position: 'absolute', bottom: '24px', left: '8px', transformOrigin: '0 0', width: '164px' }} >30 Second Song Preview</p2>
    </div>
  }

  function renderPlayButton() {
    return <div className="play-button-icon">
      <img height={38} width={38} style={{ paddingLeft: '4px' }} src="./play-icon.png" />
    </div>
  }

  const copyURL = () => {
    let origin = window.location.origin
    let url = origin + `/drop/${props.drop.id}`
    navigator.clipboard.writeText(url).then(function () {
      alert('Copying to clipboard was successful!');
    }, function (err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  const handleOpenImg = (idx) => {
    setImgModal(true)
    setSrcIndex(idx)
  }

  const openUser = (e) => {
    const user_id = currentUser.uid;
    if (user_id !== props.drop.user_id) {
      history.push(`/profile/${props.drop.user_id}`)
    }
    else {
      window.location.reload()
    }
  }

  const style = props.style || {};

  return (
    <div className="detail-view" style={style}>
      {imgModal &&
        <ImgModal
          medias={props.drop.media}
          setImgModal={setImgModal}
          sourceIdx={srcIndex} />
      }
      <div className="detail-view-header">
        <Avatar userImage={artist_image}
          style={{ margin: 10 }}
          initial={getInitials(artist_name)}
          view_only small
          userId={props.drop.user_id} />

        {/* <img className="detail-view-header-image" src={artist_image}/> */}
        <h1 className="drop-detail-title"
          style={{ cursor: 'pointer' }}
          onClick={openUser}
        >{artist_name}
        </h1>
        <img className="close-detail-button close-button view-close-btn"
          style={{ width: '39px', height: '39px', cursor: 'pointer' }}
          onClick={() => closeDetail()} src="./close-icon.png"
          alt="/" />
      </div>

      {props.drop.media.length > 1 ?
        <div
          className="drop-detail-image"
          onClick={() => props.handleClick()}>
          {props.drop.type === "music" ? renderMusicSideDetails() : <></>}
          {props.drop.type === "music" ? renderPlayButton() : <></>}
          <Slider {...settings}>
            {
              props.drop.media.map((img, index) => {
                return (
                  <div className="img-cnt">
                    <div className="bg-img"
                      style={{ backgroundImage: `url(${img.url})` }}
                      onClick={() => handleOpenImg(index)}>
                    </div>
                  </div>
                )
              })
            }
          </Slider>
        </div>
        :
        <div className={'drop-detail-image-single'}>
          <div className="bg-img"
            style={{ backgroundImage: `url(${props.drop.media[0].url})` }}
            onClick={() => handleOpenImg(0)}>
          </div>
          {/* <img style={{ height: '100%', width: '100%', borderRadius: '6px', cursor: 'pointer' }}
            src={props.drop.media[0].url} alt={'Cover' + 1 + 'Photo'}
            onClick={() => handleOpenImg(0)} /> */}
        </div>
      }

      <h1 className="drop-detail-title">{props.drop.title}</h1>
      <div style={{ height: '1px', background: '#2F2F2F', margin: '12px 50px 0 50px' }} />
      <div className="drop-detail-holder" style={{ marginTop: '12px' }}>
        <p2 className="drop-marketplace-title">{props.drop.marketplace}</p2>
        <p2 className="drop-category-title">{props.drop.category}</p2>
        <p2 className="drop-price"><span>Ξ</span>
          {props.drop.price !== '' && props.drop.price !== undefined ? props.drop.price
            : props.drop.auction_price && props.drop.auction_price !== undefined ? props.drop.auction_price
              : 0}
        </p2>
      </div>
      <div className="drop-detail-holder" style={{ marginTop: '0px' }}>
        {props.drop.drop_pieces !== undefined && <p2 className="drop-detail-piece-no">{props.drop.drop_pieces} Pieces</p2>}
        <p2 className="drop-detail-date">{formatDate(props.drop.drop_date, true)}</p2>
      </div>
      {props.show && (
        <FormBtn className="w-100" type="submit"
          onClick={copyURL}
          style={{ margin: "10px auto", width: "fit-content" }}>
          Get Sharable URL
        </FormBtn>
      )}
      <div className="drop-description-holder">
        <p1 className="drop-detail-description-text">
          {props.drop.desc}
        </p1>
      </div>

      {currentUser.uid === props.drop.user_id && (
        <DropLink
          drop={props.drop} />
      )}
    </div>
  );
}
