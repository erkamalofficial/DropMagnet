import React from "react";
import {Container} from "../../styled-components/Container";
import {StepTitle} from "../../styled-components/Step-Title";
import styled from "styled-components";
import CreateNewWallet from "../../styled-components/CreateNewWallet";

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
`;
const Wallet = styled.div`
  position:relative;
  max-width: 304px;
  width: 100%;
  height: 152px;
  box-shadow: inset 0 1px 3px #0b0b0b;
  border-radius: 40px;
  background-color: #101219;
  margin: 0 auto 16px;
  padding: 18px 23px;
`;
const Edit = styled.p`
  position: absolute;
  top: 8px;
  right: 21px;
  color: #eaeaea;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  margin: 0;
`;
const WalletTitle = styled.div`
  max-width: 173px;
  width: 100%;
  margin: 0 auto;
  height: 55px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -4px 0 #161616;
  border-radius: 5px;
  background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);
  padding: 4px 11px 11px;
  margin-bottom:6px;
  p{
    margin: 0;
    text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    color: #eaeaea;
    font-size: 16px;
    font-weight: 700;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
  }
`;

const WalletLink = styled.div`
  max-width: 258px;
  width: 100%;
  margin: 0 auto;
  height: 55px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -4px 0 #161616;
  border-radius: 5px;
  background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);
  display:flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  a{
  display:block;
  margin: 0 auto;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  color: #eaeaea;
  font-size: 16px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  }
`;

const ConnectedWallets = () => {
    return (
        <Container className="mt-5">
            <ConnectedWalletsContainer>
                <StepTitle>
                    Title
                </StepTitle>
                <WalletsContainer>
                    <Wallet>
                        <Edit>Edit</Edit>
                        <WalletTitle>
                            <p>Art Gallery</p>
                            <p>ox85kj2k</p>
                        </WalletTitle>
                        <WalletLink>
                            <a href="/" >ArtGallery.link/CryptoArtMan</a>
                        </WalletLink>
                    </Wallet>
                    <Wallet>
                        <Edit>Edit</Edit>
                        <WalletTitle>
                            <p>Art Gallery</p>
                            <p>ox85kj2k</p>
                        </WalletTitle>
                        <WalletLink>
                            <a href="/" >ArtGallery.link/CryptoArtMan</a>
                        </WalletLink>
                    </Wallet>
                    <Wallet>
                        <Edit>Edit</Edit>
                        <WalletTitle>
                            <p>Art Gallery</p>
                            <p>ox85kj2k</p>
                        </WalletTitle>
                        <WalletLink>
                            <a href="/" >ArtGallery.link/CryptoArtMan</a>
                        </WalletLink>
                    </Wallet>
                    <Wallet>
                        <Edit>Edit</Edit>
                        <WalletTitle>
                            <p>Art Gallery</p>
                            <p>ox85kj2k</p>
                        </WalletTitle>
                        <WalletLink>
                            <a href="/" >ArtGallery.link/CryptoArtMan</a>
                        </WalletLink>
                    </Wallet>
                </WalletsContainer>
                <CreateNewWallet
                    text="Connect New Wallet"
                    pathTo="/explore-galleries/create-new-wallet/step1"/>
            </ConnectedWalletsContainer>
        </Container>
    )
}

export default ConnectedWallets