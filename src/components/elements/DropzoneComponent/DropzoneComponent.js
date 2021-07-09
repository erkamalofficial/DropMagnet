// import { AlarmRounded } from '@material-ui/icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import './DropzoneComponent.css'
import { useSpringCarousel } from "react-spring-carousel-js";


const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const ThumbnailContainer = styled.div`
  display: grid;
  grid-gap: 10px;
  overflow-x: auto;
  grid-template-columns:repeat(8,150px); 
  grid-template-columns:repeat(8,150px); 
  &.one-grid-layout{
    grid-template-rows: repeat(1,150px);
  }
  &.two-grid-layout{
    grid-template-rows: repeat(2,150px);
  
  }
  &.no-layout{
    display: none;
  }
`;

const Thumbnail = styled.div`
  border-radius: 4;
  background-color: #8888FF;
  height: 150px;
  width: 150px;
  >img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

function DropzoneComponent(props) {
const {files, setFiles} = props
  const onDrop = useCallback(acceptedFiles => {
    const newFiles = [...acceptedFiles,...files];
    console.log(newFiles.length);
    if(newFiles.length <=16){
      setFiles(newFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }else{
      alert('Not more than 16 files are allowed !!');
    }
    
  }, [files,setFiles]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 16
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const thumbs = files.map((file,ind )=> (
    <Thumbnail key={ind}>
      <img
        src={file.preview}
        alt={file.name}
      />
    </Thumbnail>
  ));

  // clean up
  useEffect(() => () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  // const {carouselFragment} = useSpringCarousel({
  //   items: thumbs
  // })


  return (
    <section>
      <ThumbnailContainer className={(files.length >8) ? 'two-grid-layout': (files.length> 0 ? 'one-grid-layout': 'no-layout' )}>
        {thumbs}
      </ThumbnailContainer>
      <div className={"dropzone-style "+(files.length > 0?'more-files': '')} {...getRootProps({style})}>
        <input {...getInputProps()} />
        <h2 style={{textAlign: 'center', marginTop: '24px', marginBottom: '24px'}}>
          {files.length >0 ? "Add More Files": "Drop your files here (jpeg, png, gif, mov, mp4)"}
        </h2>
        <img style={{paddingTop: "24px"}} alt={'DropFilesHere'} width={138} height={138} src="./drop-box-icon.png" />
      </div>
    </section>
  )
}

export default DropzoneComponent;