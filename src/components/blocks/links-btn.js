import styled from "styled-components";

const LinksBtn = styled.div`
  border-radius: 30px;
  border: 1px solid var(--pureBlack);
  line-height: 40px;
  background: var(--darkGray);
  padding: 5px 24px;

  &.button-active {
    background-color: var(--darkBlue);
    border: 3px solid var(--purple500);
  }
  .tagLink {
    color: var(--rose500);
  }
  .tagYou {
    color: var(--blue200);
  }
`;
export default function (props) {
  const { galleryName } = props;
  return (
    <LinksBtn {...props}>
      <span className="tagLink">BasketballNFTs.Link</span>
      <span className="tagYou">/{galleryName}</span>
    </LinksBtn>
  );
}
