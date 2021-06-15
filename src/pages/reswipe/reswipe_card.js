import React from 'react';
import styled from "styled-components";
const Card = styled.div`
width: 440px;
padding: 10px 20px;
border-radius: 10px;
transform-origin: center;
cursor: -webkit-grab;
transform-style: preserve-3d;
transform: perspective(900px);
background: #262626;
box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
display: flex;
flex-direction: column;
background-size: 0 0;
`

export default function ReswipeCard(props){
    return(
        <Card>
            {props.children}
        </Card>
    )
}