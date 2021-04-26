
import styled from 'styled-components';
import NftDisplay from './nft-display';
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";

const WalletWrapper = styled.div`
    max-width: 600px;
    width: 100%;
    margin: 0 auto; 
    overflow: hidden;
`;

const WalletMain = (props) => {
    return (
        <WalletWrapper>
            <FixedHeader {...props} />
            <NftDisplay />
        </WalletWrapper>
    )

}

export default WalletMain;
