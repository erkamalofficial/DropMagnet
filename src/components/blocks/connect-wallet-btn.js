import styled from 'styled-components';
const ConnectWalletBtn = styled.div`
    height: 36px;
    border-radius: 19px;
    background-color: var(--white);
    color: var(--lightBlack);
    font-family: Quicksand;
    font-size: 26px;
    font-weight: 600;
    font-style: normal;
    margin-left: 16px;
    padding: 8px 24px;
    line-height: 32px;
    cursor: pointer;
`;
export default (props) => <ConnectWalletBtn {...props} />;
