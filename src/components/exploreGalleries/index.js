import React, { useEffect } from "react";
import '../App.scss'
import { Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import HomePage from "./pages/homePage/homePage";
import Footer from "./components/footer/footer";
import ConnectedWallets from "./pages/connectedWallets/connectedWallets";
import ConnectNewWallet from "./pages/connectNewWallet/connectNewWallet";
import FadeIn from "react-fade-in";

const ExploreGalleries = (props) => {

    useEffect(() => {
        // First rendering
        if (props.reload) {
            sessionStorage.setItem('headerLoad', 'true')
        }
        else if (!props.reload && sessionStorage.headerLoad) {
            sessionStorage.removeItem('headerLoad')
        }
    }, [])

    useEffect(() => {
        setTimeout(() => {
          props.setReload(false)
        }, 500);
      }, [])

    return (
        <div className="explore-galleries-content">
            {props.reload ? (
                <FadeIn delay={200} childClassName="fading-navbar">
                    <Navbar />
                </FadeIn>
            ) : (
                <Navbar />
            )}

            <Route exact path="/home">
                <div className="homepage">
                    <HomePage />
                    <Footer />
                </div>
            </Route>
            <Route path="/home/connected-wallets">
                <ConnectedWallets />
            </Route>
            <Route path="/home/create-new-wallet">
                <ConnectNewWallet />
            </Route>
        </div>
    )
}

export default ExploreGalleries