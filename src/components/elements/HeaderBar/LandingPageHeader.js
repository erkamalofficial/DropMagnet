import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Tabs from "../Tabs";
import { LogoTitleSection, LogoTitle } from "./LogoTitles";
import Web3 from "web3";
import Web3Modal, { getProviderInfoByName } from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import WalletLink from "walletlink"


const TAB_LIST = ["Drop Swipe", "NFT Galleries", "SmartURLs"];

const LinksHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  margin: 16px;
  margin-top: 20px;
  flex-wrap: wrap;
  @media (max-width: 576px){
    margin-bottom: 0;
  }
`;

const LogoSection = styled.div`
  display: flex;
  max-height: 42px;
`;
const BrandLogo = styled.img`
  height: auto;
  width: auto;
  max-height: 42px;
  cursor: pointer;
`;

const MiddleSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% + 20px ),-50%);
  @media(max-width: 576px){
    position: static;
    transform: translate(0,0);
  order: 3;
    margin-top: 12px;
    flex-basis: 100%;
  }
`;
const RightSection = styled.div`
  display: flex;
`;
const LandingPageHeader = ({ isLoggedIn }) => {
  const history = useHistory();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const coinbase = getProviderInfoByName('Coinbase')

  const walletLink = new WalletLink({
    appName: "Dropmagnet",
    appLogoUrl: "https://example.com/logo.png",
    darkMode: "false"
  })

  const ethereum = walletLink.makeWeb3Provider(
    "https://ropsten.infura.io/v3/a789adc9c04146d88b3fb64732fbf206", 1
  )

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      }
    },

    fortmatic: {
      package: Fortmatic,
      options: {
        key: "pk_test_AFA830F46E222207"
      }
    },
    "custom-coinbase": {
      display: {
        logo: coinbase.logo,
        name: coinbase.name
      },
      package: ethereum,
      connector: async () => {
        const provider = ethereum;
        await provider.enable()
        return provider;
      }
    }
  };

  const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
    theme: "dark"
  });


  const connectWallet = async (e) => {
    e.preventDefault()
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    console.log(web3)
  }


  return (
    <LinksHeaderWrapper>
      <LogoSection>
        <BrandLogo
          onClick={() => {
            window.location.href = "/home";
          }}
          src="./drop_logo.png"
          alt="drop magnet"
        />
        <LogoTitleSection>
          <LogoTitle>drop magnet</LogoTitle>
          <div>#ThreeTheWeb</div>
        </LogoTitleSection>
      </LogoSection>
      <MiddleSection>
        <Tabs tabs={TAB_LIST} activeTabIndex={activeTabIndex} onChangeTab={(index) => setActiveTabIndex(index)} />
      </MiddleSection>
      <RightSection>
        {!isLoggedIn ? (
          <>
            <button className={"blank-button green-gradient"}  onClick={() => history.push('/login')}>
              <span className={'text'}>Login</span>
            </button>
          </>
        ) : (
          <button className={"blank-button green-gradient"} onClick={() => history.push('/home')}>
            <span className={'text'}>Home</span>
          </button>
        )}
      </RightSection>
    </LinksHeaderWrapper>
  );
};

export default LandingPageHeader;
