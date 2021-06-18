import styled from "styled-components";

const ProgressBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  color: #ebeae8;
  box-shadow: inset 0 1px 3px rgb(0 0 0 / 50%),
    inset 0 -1px 2px rgb(0 0 0 / 50%), inset 0 -3px 0 rgb(37 37 37 / 50%),
    inset 0 2px 4px rgb(0 0 0 / 50%), 0 3px 2px rgb(0 0 0 / 13%);
  justify-content: space-between;
  margin-bottom: var(--gap-bottom);
  padding: 6px 16px;
  border-radius: 22px;
  z-index: 1;
  width: 425px;
  top: 89px;
  background: #1d1c1c;
  span {
    line-height: 24px;
  }
  span.reswipeBtn {
    cursor: pointer;
  }
`;

const ProgressBar = ({ size, selectedCount, closeReswipe }) => {
  return (
    <ProgressBarWrapper>
      <span>
        {selectedCount}/{size}
      </span>
      <span className="reswipeBtn" onClick={() => closeReswipe()}>
        Exit reswipe
      </span>
    </ProgressBarWrapper>
  );
};
export default ProgressBar;
