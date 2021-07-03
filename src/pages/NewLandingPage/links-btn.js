import styled from "styled-components";

const LinksBtnWrapper = styled.div`
  border-radius: 30px;
  border: 1px solid var(--pureBlack);
  line-height: 40px;
  background: var(--darkGray);
  padding: 5px 24px;
  cursor: pointer;

  &.button-active {
    background-color: var(--darkBlue);
    border: 1px solid var(--purple500);
  }

  &.button-disabled {
    background-color: var(--darkBlue);
    border: 1px solid #2e2e2f;
    filter: grayscale(1);
    user-select: none;
    span {
      color: #444040;
    }
  }

  .tagLink {
    color: var(--rose500);
  }
  .tagYou {
    color: var(--blue200);
  }
`;
const LinksBtn = ({ galleryName, linkName, selectLink, ...rest }) => (
  <LinksBtnWrapper {...rest}  onClick={selectLink}>
    <span className="tagLink">{linkName}</span>
    <span className="tagYou">/{galleryName}</span>
  </LinksBtnWrapper>
);

export default LinksBtn;
