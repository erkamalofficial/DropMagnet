import React from 'react'
import "./DropDetail.css"
import { epochToDayMonthHour, formatDate } from '../../../helpers/DateFormatter'
import Avatar from '../../elements/Avatar/Avatar'
import { getInitials } from '../../../utils'
import { FormBtn } from '../../../pages/register/FormComponents'
import VideoPlayer from '../../VideoPlayer'
import styled from "styled-components";
import video from '../../../assets/sample-mp4-file.mp4';


const VideoHolder = styled.div`
height: 195px;
width: 195px;
cursor: pointer;
border-radius: 3px;
position: relative;
align-self: center;
background-color: #000;
margin-top: 2px;
margin-bottom: 26px;
border-radius: 6px;
overflow: hidden
`

export default function DummyDropDetail(props) {

    const cats = JSON.parse(props.drop.categories)

    function closeDetail() {
        if (typeof props.goBack !== "undefined") {
            props.goBack()
        }
        else {
            props.closeDetailView()
        }
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

    return (
        <div className="detail-view dummy">
            <div className="detail-view-header">
                <Avatar userImage={''} initial={getInitials("Admin", "")} view_only small style={{ margin: 10 }} />
                <h1 className="drop-detail-title exp-view">Admin</h1>
                <img style={{ width: '39px', height: '39px', cursor: 'pointer', padding: 6, marginRight: 10 }}
                    onClick={() => closeDetail()} src="./close-icon.png"
                    alt="/" />
            </div>

            <div className={'drop-detail-video-single'}>
                <VideoHolder className={'video-playback'}>
                    <video width="195" height="100%" controls playsInline>
                        <source src={props.drop.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </VideoHolder>
            </div>

            <h1 className="drop-detail-title exp-view">{props.drop.heading}</h1>
            <div style={{ height: '1px', background: '#2F2F2F', margin: '12px 50px 0 50px' }} />
            {
                props.drop.is_categories === 'enable' && (
                    <div className="drop-detail-holder" style={{ marginTop: '12px' }}>
                        <p2 className="drop-marketplace-title">{cats[0]}</p2>
                        <p2 className="drop-category-title">{cats[1]}</p2>
                        <p2 className="drop-price"><span>Ξ</span>{cats[2]}</p2>
                    </div>
                )
            }
            <div className="drop-detail-holder" style={{ marginTop: '0px' }}>
                {props.drop.drop_pieces !== undefined && <p2 className="drop-detail-piece-no">{0} Pieces</p2>}
                <p2 className="drop-detail-date">{formatDate(new Date(), true)}</p2>
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
                    {props.drop.sub_heading}
                </p1>
            </div>
            <div className="bottom-button-holder">
                <div className="dismiss-button-unselected">
                    <div style={{ margin: '0px auto 0 auto' }}>
                        <img width={32} src="./discard-icon.png" className={'clickable'} alt="/"/>
                    </div>
                </div>
                <div className="add-button-unselected">
                    <img style={{ margin: '0 auto' }} width={32} height={32} className={'clickable'} 
                    src="./add-icon.png" alt="/"/>
                </div>
            </div>
        </div>
    );
}
