import styled from 'styled-components';

const ProgressBar = styled.div`
    display: flex;
    flex-direction: row;
    color: #ebeae8;
    box-shadow: inset 0 1px 3px rgb(0 0 0 / 50%), inset 0 -1px 2px rgb(0 0 0 / 50%), inset 0 -3px 0 rgb(37 37 37 / 50%), inset 0 2px 4px rgb(0 0 0 / 50%), 0 3px 2px rgb(0 0 0 / 13%);
    justify-content: space-between;
    margin: 0 8px 16px;
    padding: 8px 16px;;
    border-radius: 22px;
    position: absolute;
    z-index: 1;
    width: 100%;
    top: 89px;
    background: #1d1c1c;
    // @media (max-width: 600px) {
    //     margin: 0 0 16px;
    //     padding: 8px 40px;
    //     border-radius: unset;
    // }
    span {
        line-height: 24px;
    }
    span.reswipeBtn {
        cursor: pointer;
    }
`;

export default ({ size, selectedCount, handleReswipe }) => {
    return (
        <ProgressBar>
            <span>{selectedCount}/10</span>
            <span className="reswipeBtn" onClick={() => handleReswipe()}>Exit reswipe</span>
        </ProgressBar>
    );
};
