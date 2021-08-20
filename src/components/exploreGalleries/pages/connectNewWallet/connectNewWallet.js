import React from "react";
import {Container} from "../../styled-components/Container";
import {StepTitle} from "../../styled-components/Step-Title";
import styled from "styled-components";
import CreateNewWallet from "../../styled-components/CreateNewWallet";
import {NavLink, Route} from "react-router-dom";
import SmallCard from "../../styled-components/SmallCard";
import glass from "../../assets/glass.svg"

const ConnectedWalletsContainer = styled.div`
  max-width: 343px;
  width: 100%;
  margin: 0 auto;
  height: 519px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 0 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: #151414;
  overflow: hidden;
  display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
`;
const WalletsContainer = styled.div`
    max-height: 363px;
    height: 100%;
    overflow-y: auto;
    padding: 22px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .last-step{
        max-width: 257px;
        width: 100%;
        margin: 17px auto;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
          color: #eaeaea;
          font-size: 18px;
          font-weight: 700;
          font-style: normal;
          letter-spacing: normal;
          line-height: normal;
          text-align: center;
    }
    .last-step-link{
        display: block;
         color: #eaeaea;
    }
`;

const SmallCardsContainer = styled.div`
    padding: 0 52px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    @media(max-width: 374px) {
    padding: 0 20px;
    }
`


const ConnectNewWallet = () => {
    return (
        <Container className="mt-5">
            <ConnectedWalletsContainer>
                <Route path="/explore-galleries/create-new-wallet/step1">
                    <StepTitle>
                        Select SmartURL for wallet
                    </StepTitle>
                    <WalletsContainer>

                    </WalletsContainer>
                    <CreateNewWallet text="Continue" pathTo="step2"/>
                </Route>
                <Route path="/explore-galleries/create-new-wallet/step2">
                    <StepTitle>
                        Wallet Connect
                    </StepTitle>
                    <WalletsContainer>

                    </WalletsContainer>
                    <CreateNewWallet text="Continue" pathTo="step3"/>
                </Route>
                <Route path="/explore-galleries/create-new-wallet/step3">
                    <StepTitle>
                        Visability for 0x71…471j/
                        <span>ArtGallery.link/CryptoArtMan</span>
                    </StepTitle>
                    <WalletsContainer>
                        <SmallCardsContainer>
                            <SmallCard image={glass} text="Public"/>
                            <SmallCard image={glass} text="Private"/>
                            <SmallCard image={glass} text="Smart"/>
                        </SmallCardsContainer>
                    </WalletsContainer>
                    <CreateNewWallet text="Continue" pathTo="step4"/>
                </Route>
                <Route path="/explore-galleries/create-new-wallet/step4">
                    <StepTitle>
                        Connection Complete!
                    </StepTitle>
                    <WalletsContainer>
                        <div>
                            <p className="last-step">
                                NFTs from Ethereum wallet
                                0x83…4812j are now live at
                                <NavLink to="/" className="last-step-link">ArtGallery.link/CryptoArtMan</NavLink>
                            </p>
                            <p className="last-step">
                                You can also accept payments
                                to the connected wallet with
                                the Drop Magnet pay button on
                                your Gallery top page!
                            </p>
                        </div>
                    </WalletsContainer>
                    <CreateNewWallet text="Share NavLink!" pathTo="/explore-galleries/finish"/>
                </Route>
            </ConnectedWalletsContainer>
        </Container>
    )
}

export default ConnectNewWallet