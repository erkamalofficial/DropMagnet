import styled from 'styled-components';
const WalletHeader = styled.div`
    padding: 16px;
    background: rgba(31,31,31,1.0);
    display: flex;
    width: 100%;
    line-height: 70px;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
`;
const Circle = styled.div`
    height: 25px;
    width: 25px;
    background-color: var(--grayBlue);
    border-radius: 50%;
    display: inline-block;
`;
export default (props) => (
    <WalletHeader {...props}>
        <Circle />
        <Circle />
    </WalletHeader>
);
