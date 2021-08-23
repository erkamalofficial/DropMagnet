import React, { useState } from "react";
import Header from "./components/header/header";
import Search from "./styled-components/textfield";
import Card from "./components/card/card";
import image1 from "./assets/background.png";
import image2 from "./assets/background2.png";
import CreateURL from "./components/createurl/CreateURL";


const MyGallery = () => {

    const [open, setOpen] = useState(false)

    const showModal = () => {
        return (
            <div className="tnc-modal">
                <div className="content">
                    <div className="modal-title">
                        Terms & Conditions
                    </div>
                    <p>In publishing and graphic design, Lorem ipsum is a placeholder
                        text commonly used to demonstrate the visual form of a document or a
                        typeface without relying on meaningful content.
                        Lorem ipsum may be used as a placeholder before final copy is available.
                    </p>
                    <button>
                        I understand & agree.
                    </button>
                    <p>or</p>
                    <button onClick={() => setOpen(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <Search type="search" placeholder="Search" />
            {open && showModal()}
            <div style={{ marginBottom: '80px' }}>
                <Card nft={10} artist={"Artist.link/CryptoArtMan"} image={image1} 
                setOpen={setOpen} />
                <Card nft={10} artist={"Me.link/Alexander"} image={image2} 
                setOpen={setOpen} />
                <Card nft={10} artist={"Me.link/Alexander"} image={image2} 
                setOpen={setOpen} />
                <Card nft={10} artist={"Me.link/Alexander"} image={image2} 
                setOpen={setOpen} />
                <Card nft={10} artist={"Me.link/Alexander"} image={image2} 
                setOpen={setOpen} />
            </div>
            <CreateURL />
        </div>
    )
}


export default MyGallery