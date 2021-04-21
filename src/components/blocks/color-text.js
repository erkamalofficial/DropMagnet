import styled from 'styled-components';

const ColorTextWrapper = styled.div`
    font-size: 33px;
    font-weight: 700;
    line-height: 21px;
    text-align: center;
    margin-bottom: 32px;
    letter-spacing: 9.37px;
    line-height: 33px;
    margin-bottom: 24px;
`;
export default function () {
    return <ColorTextWrapper>
        <span style={{ color: '#df31ff' }}>W</span>
        <span style={{ color: '#8e48ff' }}>o</span>
        <span style={{ color: '#6666ff' }}>n</span>
        <span style={{ color: '#0099cc' }}>d</span>
        <span style={{ color: '#00cc33' }}>e</span>
        <span style={{ color: '#ffff00' }}>r</span>
        <span style={{ color: '#ffcc00' }}>f</span>
        <span style={{ color: '#00cccc' }}>u</span>
        <span style={{ color: '#33ff66' }}>l</span>
        <span style={{ color: '#ff3300' }}>l</span>
        <span style={{ color: '#99ff00' }}>y</span>
    </ColorTextWrapper>;
};
