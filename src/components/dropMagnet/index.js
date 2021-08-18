import React, {useState} from "react";
import {Redirect, Route} from "react-router-dom"
import SliderPage from "./pages/sliderPage";
import Navbar from "./components/navbar/navbar";
import ScrollSnapPage from "./pages/scrollSnapPage/ScrollSnapPage";
import FileMenu from "../myGallery/fileMenu/fileMenu";
import styled from "styled-components";

const HeaderTop = styled.div`
  height: 68px;
  position: fixed;
  top: 0;
  z-index: 19;
  
  @media (min-width: 1400px) {
    left: -16px;
  }
`;

const DropMagnet = () => {

	// const [darkTheme, setDarkTheme] = useState(false);
	const darkTheme = false;

	const [data, setData] = useState([])

	const changeSlide = (val) => {
		// console.log(val);
		// console.log(data);
		setData([...val])
	}

	return (
		<div>
			<Route exact path="/drop-magnet" render={()=> <Redirect to="/drop-magnet/artgallery.link" />}/>
			<Route exact path="/drop-magnet/artgallery.link">
				<Navbar path={'/drop-magnet/artgallery.link'} text={'ArtGallery.Link'}/>
				<SliderPage/>
			</Route>

			{/*<Route path="/drop-magnet/artgallery.link/cryptoartman">*/}
			{/*	<Navbar path={'/drop-magnet/artgallery.link/cryptoartman'} text={'Mag.Link/CryptoArtMan'}/>*/}
			{/*	<CryptoArtManPage/>*/}
			{/*</Route>*/}
			{/*<Route path="/drop-magnet/artgallery.link/newcryptoartman">*/}
			{/*	<VericalySlidedPage/>*/}
			{/*</Route>*/}

			<Route path="/drop-magnet/artgallery.link/verticaly">
				<HeaderTop>
					<FileMenu changeSlide={changeSlide} darkTheme={darkTheme}/>
				</HeaderTop>

				<ScrollSnapPage darkTheme={darkTheme} changeSlide={changeSlide}  data={data}/>
			</Route>
		</div>

	)
}

export default DropMagnet