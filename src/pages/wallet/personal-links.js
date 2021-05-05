
import styled from 'styled-components';
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";
import { useState } from 'react';
import CardSectionDesktop from './card-section-desktop';
import CardSectionMobile from './card-section-mobile';
import useViewport from './useViewport';



const PersonalLinksWrapper = styled.div`
    // max-width: 600px;
    width: 100%;
    margin: 0 auto; 
    overflow: hidden;
`;

const PLSectionOne = styled.div`
    margin-top: 72px;
    margin-bottom: 40px;
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
const HeaderTitle = styled.div`
    font-size: var(--font-size-xxl);
    margin-bottom: 16px;
`;
const HeaderTitleTag = styled.div`
    font-size: var(--font-size-xl);
    letter-spacing: 8px;
    margin-bottom: 16px;
    color: var(--grey400);

`;
const HeaderSubtitle = styled.div`
    font-size: var(--font-size-xl);
    margin-bottom: 16px;
    font-weight: 700;

`;


const PLSectionThree = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;
const PLSectionThreeTitle = styled.div`
    line-height: 28px;
    font-weight: 700;
    color: var(--grey300);
    font-size: var(--font-size-l)
`;
const PLSectionUserinput = styled.input`
    font-weight: normal;
    border: 1px solid var(--purple500);
    color: var(--grey250);
    font-size: var(--font-size-m);
    border-radius: 5px;
    width: 398px;
    line-height: 48px;
    text-align: center;
`;
const PLSectionEmojiLine = styled.div`
    font-weight: 500;
    color: var(--grey250);
    font-size: var(--font-size-s);
`;
const PLSectionBtn = styled.div`
    button {
        line-height: 40px;
        background-color: var(--darkBlue);
        color: var(--grey300);
        border: 1px solid var(--purple500);
        border-radius: 5px;
        font-size: var(--font-size-xs);
        font-weight: 700;
        padding: 0 14px;
        margin-right: 16px;
        cursor: pointer;
    }
`;
const CardOverLay = styled.div`
    background: url('./links_card.png');
    position: absolute;
    width: 1440px;
    height: 1024px;
`;
const PersonalLinks = props => {
    const [galleryName, setGalleryName] = useState('');
    const displayName = galleryName === '' ? 'You' : galleryName;
    const { viewportWidth } = useViewport();
    const breakpoint = 620;

    const handleGalleryName = (val) => {
        const checkAndLimitGalleryName = val.length > 22 ? `${val.substring(0, 22)}...` : val;
        setGalleryName(checkAndLimitGalleryName);
    }
    return (
        <PersonalLinksWrapper>
            <FixedHeader {...props} />
            {/* <CardOverLay> Test </CardOverLay> */}

            <PLSectionOne>
                <PLSectionOneContent>
                    <HeaderTitle> Display Your NFTs </HeaderTitle>
                    <HeaderTitleTag> BEAUTIFULLY </HeaderTitleTag>
                    <HeaderSubtitle> Promote your art with unique personal links </HeaderSubtitle>
                </PLSectionOneContent>
            </PLSectionOne>
            <CardSectionDesktop displayName={displayName} />

            {/* {viewportWidth < breakpoint ?
                <CardSectionMobile displayName={displayName} /> :
                <CardSectionDesktop displayName={displayName} />} */}
            <PLSectionThree>
                <PLSectionThreeTitle>
                    <span>Reserve Your</span>
                    <span>Gallery Name</span>
                </PLSectionThreeTitle>
                <PLSectionUserinput
                    placeholder="Enter your brand or name here"
                    onChange={(e) => handleGalleryName(e.target.value)}
                />
                <PLSectionEmojiLine>Emoji's are allowed! ❤️</PLSectionEmojiLine>
                <PLSectionBtn>
                    <button>Learn More</button>
                    <button>Sign Up</button>
                </PLSectionBtn>
            </PLSectionThree>

        </PersonalLinksWrapper>
    )

}

export default PersonalLinks;
