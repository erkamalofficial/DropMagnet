import React from "react";
import Header from "./components/header/header";
import Search from "./styled-components/textfield";
import Card from "./components/card/card";
import image1 from "./assets/background.png";
import image2 from "./assets/background2.png";


const MyGallery = () => {
    return (
        <div>
            <Header/>
            <Search type="search" placeholder="Search"/>
            <div>
                <Card nft={10} artist={"Artist.link/CryptoArtMan"} image={image1}/>
                <Card nft={10} artist={"Me.link/Alexander"} image={image2}/>
            </div>
        </div>
    )
}


export default MyGallery