import styled from 'styled-components';
const ConnectAnotherWalletBtn = styled.div`
    border-radius: 19px;
    color: var(--whiteGray);
    font-size: 26px;
    font-weight: 700;
    padding: 12px 24px;
    line-height: 32px;
    cursor: pointer;

    background-color: var(--grayBlack);
    border-radius: 31px;
    box-shadow: 0px 5px 3px rgb(0 0 0 / 18%);

`;
export default (props) => <ConnectAnotherWalletBtn {...props}> Connect Another Wallet </ConnectAnotherWalletBtn>;
