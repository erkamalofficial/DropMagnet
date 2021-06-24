import React, { useState } from 'react';
import ReswipeCard from './reswipe_card';
import styled from 'styled-components';


const Final4Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 150px);
  grid-template-columns: repeat(2,150px);
  grid-gap: 10px;
  margin: auto;
`

const DropCard = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all .4s;
  >.drop-img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all .2s;
  }
  >.title-author{
    position: absolute;
    top: 100%;
    text-align: center;
    left: 50%;
    transition: all .2s;
    opacity: 0;
    transform: translate(-50%,-50%);
  }
  :hover{
    >.drop-img{
      filter: blur(6px);
      transform: scale(1.2);
      opacity: .8;
    }
    >.title-author{
      top: 50%;
      opacity: 1;
    }
  }
`

const DropTitle = styled.h3`
  color: #000;
  font-weight: 600;
  font-size: 20px;
`

const DeletedBadge = styled.div`
  right: 10px;
  top: 10px;
  border-radius: 50%;
  position: absolute;
  z-index: 5;
  padding: 4px 7px;
  background-color: red;
`

export default function FinalFour({bucket,deleted,onChange}){
    const handleChange = (isDeleted,index)=>{
      onChange(isDeleted, index);
    }
    return(<ReswipeCard>
            <h1 className={'h1-large'} style={{fontSize: '32px',textAlign: 'center'}}>You’re so good at this!</h1>
              <Final4Grid>
                {bucket.map((item,i)=>{
                 return <DropCard onClick={()=>handleChange(!deleted[i],i)} className={deleted[i]&&'delete-drop-card'}>
                    <img src={item.media && item.media[0].url} className={'drop-img'} alt={item.title} />
                    <div className={'title-author'}>
                      <DropTitle> {item.title} </DropTitle>
                      <p> {item.artist && item.artist.name} </p>
                    </div>
                 </DropCard>
                })}
              </Final4Grid>
            <h1 className={'h1-large'} style={{fontSize: '32px',textAlign: 'center'}}>Keep all or remove with a tap!</h1>
    </ReswipeCard>)
}