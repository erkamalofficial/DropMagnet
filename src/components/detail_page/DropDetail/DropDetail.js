import React, { useState, useEffect } from 'react'
import "./DropDetail.css"
import { calcTime, epochToDayMonthHour, formatDate } from '../../../helpers/DateFormatter'
import Avatar from '../../elements/Avatar/Avatar'
import { getInitials } from '../../../utils'
import { FormBtn } from '../../../pages/register/FormComponents'
import ImgModal from '../../ImgModal/ImgModal'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../../../contexts/FirebaseAuthContext";
import Link from "../../../assets/linkIcon.svg"
import Moment from 'moment';

export default function DropDetail(props) {
  const [reveal, setReveal] = useState(false)

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
    if (typeof props.goBack !== "undefined") {
      props.goBack()
    }
    else {
      props.closeDetailView()
    }
  }

  let artist_image = props.drop.artist && props.drop.artist.avatar_url !== '' ? props.drop.artist.avatar_url : ''
  let artist_name = props.drop.artist ? props.drop.artist.username : 'Test User'

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
      history.push(`/profile`)
    }
  }

  let d = new Date(props?.drop?.drop_date)
  const date = Moment(d, "MM/DD/YYYY").format("Do MMM YYYY")
  
  let curDropDate = props.drop.drop_date
  let gmtDate = new Date(calcTime(13)).getTime()

  useEffect(() => {
    setTimeout(() => {
      setReveal(true)
    }, 10)
  }, [])

  return (
    <>
    {reveal && (
    <div className="detail-view">

      {imgModal &&
        <ImgModal
          
          style={{height:'auto'}}
          medias={props.drop.media}
          setImgModal={setImgModal}
          source={srcIndex} />
      }

      <div className="detail-view-header">
        
        <Avatar userImage={artist_image}
          initial={getInitials(props.drop?.artist?.name || 'Test User')}
          view_only
          small
          style={{ margin: 'auto 12px' }}
          userId={props.drop.user_id} />
        {/* <img className="detail-view-header-image" src={artist_image} /> */}
        <h1 className="drop-detail-title exp-view"
          style={{ cursor: 'pointer' }}
          onClick={openUser}
        >{artist_name}
        </h1>
        <img className="close-detail-button close-button view-close-btn" style={{ width: '39px', height: '39px', cursor: 'pointer' }} onClick={() => closeDetail()} src="/close-icon.png" />
      </div>

      <div className="detail-view-container">
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
                  <div className="img-cnt" style={{width:'100%',height:'400px'}}>
                  <div className="bg-img" style={{width:'100%',height:'auto'}}
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
        <div className={'drop-detail-image-single'}  style={{width:'100%'}}>
          {props.drop.media[0].type === 'video' ? (
            <video width="100%" height="100%" controls autoPlay loop playsInline>
              <source src={props.drop.media[0].url} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
          ) : <img style={{width:'100%',height:'auto'}} src={props.drop.media[0].url} onClick={() => handleOpenImg(0)}/>
          }
        </div>
      }
      {gmtDate >= curDropDate && props.drop.link!=='' ? (
        <a className="drop-detail-title exp-view"
        style={{color: '#EEEEEE'}}
         href={props.drop.link}>{props.drop.title}</a>
      ) : (
        <h1 className="drop-detail-title exp-view">{props.drop.title}</h1>
      )}
      
      <div style={{ height: '1px', background: '#2F2F2F', margin: '12px 50px 0 50px' }} />
      <div className="drop-detail-holder" style={{ marginTop: '12px' }}>
        <p2 className="drop-marketplace-title">{props.drop.marketplace}</p2>
        <p2 className="drop-category-title">{props.drop.category}</p2>
        <p2 className="drop-price"><span>Ξ</span>
          {props.drop.price !== '0' && props.drop.price !== undefined ? props.drop.price
            : props.drop.auction_price !== '0' && props.drop.auction_price !== undefined ? props.drop.auction_price
              : 0}
        </p2>
        {props.show && (
          <p2 className="drop-link"
            onClick={copyURL}>
            <img src={Link} alt="" />
          </p2>
        )}
      </div>
      {/* <div className="drop-detail-holder" style={{ marginTop: '0px' }}>
        {props.drop.drop_pieces !== undefined && <p2 className="drop-detail-piece-no">{props.drop.drop_pieces} Pieces</p2>}
        <p className="drop-detail-date">{formatDate(props.drop.drop_date, true)}</p>
      </div> */}
      
      <p style={{textAlign:'center'}} >Project Bio</p>
      <div className="drop-description-holder">
        <p1 className="drop-detail-description-text">
          {props.drop.desc}
        </p1>
      </div>

      <p style={{textAlign:'center'}} >Properties</p>

      <div style={{display:'grid',textAlign:'center',gridTemplateColumns:'auto auto'}} >
        {props.drop.attributes && props.drop.attributes.map((x, i) => (
          <div key={i} className="drop-detail-attribute">
            <p style={{fontSize:'12px', fontWeight: 900, color: '#C3C3C3' }}>{x.name.toUpperCase()}</p>
            <p style={{fontSize:'16px', fontWeight: 500, color: '#FFF', padding: '12px 0'}}>{x.value}</p>
            <p style={{fontSize:'12px', fontWeight: 500, color:'#A2A2A2', fontStyle: 'italic' }} >{'Some % have this trait'}</p>
          </div>
        ))}
      </div>
      <p className="drop-love-title">We love artists.</p>
    </div>
      
    </div>
    )}
    </>
  );
}
