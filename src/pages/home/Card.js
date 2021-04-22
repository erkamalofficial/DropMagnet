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
        color: #eaeaea;
        font-size: 20px;
    }
`;
const FooterSection = styled.div`
`;
const SwipeImage = styled.img`
    width: 100%
`;
export default function ({ cardDetails }) {
    const { title, drop_image, artist_image } = cardDetails;
    return (<CardWrapper>
        <HeaderSection>
            <UserAvatar src={artist_image} />
            <div>Crypto Art Man</div>
        </HeaderSection>
        {/* <SwipeIma   ge src={drop_image} />
        <div>Title: {title} </div>
        <FooterSection>Footer section</FooterSection> */}
    </CardWrapper>);
};
