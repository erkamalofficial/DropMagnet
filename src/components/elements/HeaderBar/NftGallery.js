import React, {useState} from 'react'
import styled from "styled-components";
import LandingPageHeader from './LandingPageHeader';
import NftTabs from './NftTabs';
import DummyPic from "../../../asstes/dummyMobile.png"


const Paragraph = styled.div`
  max-width: 600px;
  font-size: 15px;
  margin-left: 30px;
  @media (max-width: 576px) {
    width: 325px;
    margin-left: 0px;
    font-size: 15px;
  }
  margin-bottom: 16px;
  font-weight: 700;
`;

const PLSectionOne = styled.div`
  /* margin-top: 72px; */
  margin-bottom: 32px;
  @media (max-width: 600px) {
    margin-bottom: 17px;
    margin-bottom: unset;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PLSectionOneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 700;
  text-align: center;
`;



const NftGallery = () => {

    const [tabIdx, setTabIdx] = useState(0)

    return (
        <div>
            <PLSectionOne>
                <PLSectionOneContent>
                    <Paragraph>
                        Powered by NFTs, your content is owned by you.
                    </Paragraph>
                    <Paragraph>
                        Mint, display, and sell art, music, fashion, video,
                        3D files, photos, tutorials, research, writing, code,
                        services, unlockable features, and move your property
                        anywhere at lightspeed.
                    </Paragraph>
                    <Paragraph>
                        Your NFTs live in your crypto wallet, can be from
                        multiple blockchains, and multiple wallets can be
                        connected to a single NFT Gallery.
                    </Paragraph>
                    <Paragraph>
                        MetaURLs make your galleries instantly personal,
                        sharable, tradeable, memorable and promoteable.
                    </Paragraph>
                    <Paragraph>
                        Connected wallets can make use of the pay button
                        and turn your MetaURL into the most powerful
                        crypto wallet address available online.
                    </Paragraph>
                    <Paragraph>
                        Hundreds of thousands of accounts for
                        public figures are live and ready to be claimed.
                    </Paragraph>
                    <Paragraph>
                        We will never force ads onto your galleries, and we’ll
                        never sell your data, nor will we ever be able to
                        delete your property from the blockchain.

                    </Paragraph>
                    <NftTabs tabs={['2D', '3D', 'VR', 'AR']} activeTabIndex={tabIdx} onChangeTab={(index) => {
                        setTabIdx(index)
                    }} />

                    <img src={DummyPic} alt="/" 
                    style={{margin: '10px 0'}}/>
                </PLSectionOneContent>
            </PLSectionOne>

        </div>
    )
}

export default NftGallery
