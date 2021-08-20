import React, {useEffect, useState} from "react";
import styled from "styled-components";
import Navbar from "./components/navbar/navbar";
// import '../../../App.scss';
import HomePage from "./components/homePage/homePage";
import { Route, Switch} from "react-router-dom";
// import ExploreGalleries from "../exploreGalleries";
// import DropMagnet from "../dropMagnet";
// import MyGallery from "../myGallery";
// import Politician from "../dropMagnet/components/politician/politician";
import MovieKey from "./components/movieKey/MovieKey";
// import movieKey from "./components/movieKey/movieKey";
// import MyDmt from "./components/myDMTs/myDMTs";
// import DmtMovie from "./components/myDMTs/DmtMovie";

const Wrapper = styled.div`
  background-color: #fff;
  height: 100vh;
  text-align: center;
  
  // .text {
  //   // font-size: 80px;
  //   font-weight: 400;
  //   position: relative;
  //   overflow: hidden;
  //   color: #000;
  //   // opacity: 0;
  //   transition: 1s ease;
  // }
  //
  // .text:before {
  //   content: '';
  //   position: absolute;
  //   left: 120%;
  //   width: 120%;
  //   height: 120%;
  //   background: linear-gradient(90deg, transparent 0%, #fff 25%, #fff 100%);
  //   animation: fadeToRight 17s linear forwards;
  // }
  
  
`;
//
// const texts = [
//     {id: 1, text: 'Playable on any device'},
//     {id: 2, text: 'Yours to trade'},
//     {id: 3, text: 'Yours to share'},
//     {id: 4, text: 'Yours to collect'},
//     {id: 5, text: 'At lightspeed.'}
// ]

const MovieFarm = () => {
    const [size, setSize] = useState(18)

    const setSizeHandler = (e) => {
        if (e.deltaY === 100) {
            setSize(prev => prev + 1)
            console.log(e.deltaY, size)
        }
        if (e.deltaY === -100) {
            setSize(prev => prev - 1)
            console.log(e.deltaY)
        }
    }

    useEffect(() => {
        window.addEventListener('wheel', (e) => setSizeHandler(e))
        return () => window.removeEventListener('wheel', setSizeHandler)
    }, [])

    return (
        <Wrapper>
            <Navbar/>
            <Switch>
                <Route exact path="/movie-farm" render={()=> <HomePage/>}/>
                <Route path="/movie-farm/movie-key" render={() => <MovieKey/>}/>
            </Switch>


            {/*<MyDmt/>*/}
            {/*<DmtMovie />*/}
            {/*<movieKey/>*/}
            {/*<div>*/}
            {/*    <p className='text' style={{fontSize: `${size}px`, transition: '1s ease linear'}}*/}
            {/*       key={texts[0].id}>{texts[0].text}</p>*/}
            {/*</div>*/}

            {/*<p className='text' key={texts[0].id}>{texts[0].text}</p>*/}
            {/*<div className="bg">*/}
            {/*    <div className="bg-wrapper">*/}
            {/*        8K*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Wrapper>
    )
}

export default MovieFarm;
