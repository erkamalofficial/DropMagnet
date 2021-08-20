import React, {useState} from "react";
import styled from "styled-components";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const Like = styled.div`
  width: 46px;
  height: 46px;
  background-image: linear-gradient(180deg, rgba(24,24, 24, 0.83) 0%, rgba(19, 19, 19, 0.83)100%);
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  border: 0.75px solid #000000;
  
  &.light {
    background-image: linear-gradient(rgb(247, 247, 247), rgb(247, 247, 247));
    border: 1px solid #D6D6D6;
    box-shadow: 0 2px 4px #C3C3C3;
  }
  
  &.modal-icons {
    width: 50px;
    height: 40px;
    border-radius: 7px;
  }   
  
  &.gallery-style {
    width: 99px;
    height: 40px;
    border-radius: 9px;
    margin-right: 16px;
  }
  
  @media (max-width: 350px) and (max-height: 650px) {
        width: 36px;
        height: 36px;
  }
  svg{
    width: 22px;
    height: 22px;
    @media (max-width: 350px) and (max-height: 650px) {
        width: 22px;
        height: 22px;
  }
  }
  .not-liked {
    display: block;
    color: #fff;
    position: relative;
    z-index: 1;
    
    &.light {
       color: #484848;
    }
    
    &.black {
       color: #000000;
       background-color: linear-gradient(180deg, #181818 0%, #131313 100%);
    } 
  }
  .is-liked {
    display: none;
    color: #ca255f;
    position: relative;
    z-index: 1;
  }
  &.is-active {
    .not-liked {
      display: none;
    }
    .is-liked {
      display: block;
    }
  }
  //Watch me get bouncy
@-webkit-keyframes bouncy {
  from, to { -webkit-transform: scale(1, 1); }
  25% { -webkit-transform: scale(0.9, 1.1); }
  50% { -webkit-transform: scale(1.1, 0.9); }
  75% { -webkit-transform: scale(0.95, 1.05); }
}
@keyframes bouncy {
  from, to { transform: scale(1, 1); }
  25% { transform: scale(0.9, 1.1); }
  50% { transform: scale(1.1, 0.9); }
  75% { transform: scale(0.95, 1.05);}
}

//Settings
.bouncy {
  -webkit-animation: bouncy 0.6s;
  animation: bouncy 0.6s;
  -webkit-animation-duration: 0.6s;
  animation-duration: 0.6s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
`

const LikeButton = ({lightTheme, modalIcons, galleryStyle}) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div>
            <Like className={`like-button ${isActive ? "is-active" : " "} ${lightTheme} ${modalIcons} ${galleryStyle}`} onClick={() => setIsActive(!isActive)}>
                <FavoriteIcon className="is-liked bouncy"/>
                <FavoriteBorderIcon className={`not-liked bouncy ${lightTheme}`}/>
            </Like>
        </div>
    )
}

export default LikeButton