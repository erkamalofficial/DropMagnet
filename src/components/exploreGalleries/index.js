import React from "react";
import '../App.scss'
import {Route} from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import HomePage from "./pages/homePage/homePage";
import Footer from "./components/footer/footer";
import ConnectedWallets from "./pages/connectedWallets/connectedWallets";
import ConnectNewWallet from "./pages/connectNewWallet/connectNewWallet";

const ExploreGalleries = () => {
    return (
        <div className="explore-galleries-content">
            <Navbar/>
            <Route exact path="/home">
                <div className="homepage">
                    <HomePage/>
                    <Footer/>
                </div>
            </Route>
            <Route path="/home/connected-wallets">
                <ConnectedWallets/>
            </Route>
            <Route path="/home/create-new-wallet">
                <ConnectNewWallet/>
            </Route>
        </div>
    )
}

export default ExploreGalleries