import styled from "styled-components";

const LinksBtnWrapper = styled.div`
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
const LinksBtn = (props) => {
  const { galleryName } = props;
  return (
    <LinksBtnWrapper {...props}>
      <span className="tagLink">BasketballNFTs.Link</span>
      <span className="tagYou">/{galleryName}</span>
    </LinksBtnWrapper>
  );
};
export default LinksBtn;
