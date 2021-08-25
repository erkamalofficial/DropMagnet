import React, { useEffect } from "react";
import Header from "./components/header/header";
import Search from "./styled-components/textfield";
import Card from "./components/card/card";
import image1 from "./assets/background.png";
import image2 from "./assets/background2.png";
import CreateURL from "./components/createurl/CreateURL";


const MyGallery = () => {

    const cntWallets = JSON.parse(localStorage.getItem('cntWallets'))
    useEffect(() => {
        if(!cntWallets){
            localStorage.setItem('cntWallets', JSON.stringify([]))
        }
    }, [cntWallets])

    return (
        <div>
            <Header />
            <Search type="search" placeholder="Search" />
            <div style={{ marginBottom: '80px' }}>
                {[1, 2, 3, 4].map(c => (
                    <Card key={c}
                    id={c}
                    nft={10} artist={"Artist.link/CryptoArtMan"} image={image1} />
                ))}
            </div>
            <CreateURL />
        </div>
    )
}


export default MyGallery