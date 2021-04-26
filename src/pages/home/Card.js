import styled from 'styled-components';

const CardWrapper = styled.div`
    background: #262626;
    box-shadow: 0 2px 4px rgb(0 0 0 / 50%);
    display: flex;
    color: white;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;

    
`;
const UserAvatar = styled.img`
    height: 30px;
    width: 30px;
    border-radius: 15px;
`;
const HeaderSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    line-height: 48px;
    > * {
        margin: 0 10px;
        font-weight: 700;
        color: var(--grayWhite);
        font-size: 20px;
    }
`;
const FooterSection = styled.div`
    padding: 0 10px;
`;
const FooterButtons = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 1rem;
    font-weight: 700;
    line-height: 22px;
    div {
        padding: 0 10px;
        border-radius: 3px;
    }
    .rare {
        background: var(--corePurple);
    }
    .art {
        background: var(--coreBlue);
    }

`;
const FooterTitle = styled.div`
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 700;

`

const SwipeImage = styled.img`
    width: 100%
`;

export default function ({ cardDetails }) {
    const { title, drop_image, artist_image } = cardDetails;
    return [
        <HeaderSection key={1}>
            <UserAvatar src={artist_image} />
            <div>Crypto Art Man</div>
        </HeaderSection>,
        <FooterSection key={2}>
            <FooterTitle>{title} </FooterTitle>
            <FooterButtons>
                <div className="rare">RARIBLE</div>
                <div className="art">ART</div>
            </FooterButtons>
        </FooterSection>
    ]

};

