import styled from 'styled-components';

const LinksBtn = styled.div`
    border-radius: 30px;
    border: 1px solid #000;
    line-height: 40px;
    background: #242424;
    padding: 5px 32px;

    &.button-active {
        background-color: rgba(26, 39, 52, 1);
        border: 3px solid rgba(97, 26, 200, 1);
    }
    .tagLink {
        color: rgba(174, 23, 186, 1);
    }
    .tagYou {
        color: rgba(23, 130, 186, 1);
    }
`;
export default function (props) {
    return <LinksBtn {...props}>
        <span className="tagLink">BasketballNFTs.Link</span>
        <span className="tagYou">/You</span>
    </LinksBtn>;
};
