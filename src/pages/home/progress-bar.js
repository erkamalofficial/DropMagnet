import styled from 'styled-components';

const ProgressBar = styled.div`
    display: flex;
    flex-direction: row;
    color: #ebeae8;
    padding: 8px 16px;;
    box-shadow: inset 0 1px 3px rgb(0 0 0 / 50%), inset 0 -1px 2px rgb(0 0 0 / 50%), inset 0 -3px 0 rgb(37 37 37 / 50%), inset 0 2px 4px rgb(0 0 0 / 50%), 0 3px 2px rgb(0 0 0 / 13%);
    border-radius: 22px;
    justify-content: space-between;
    margin-bottom: 16px;
    span {
        line-height: 24 px;
    }
`;

export default ({ size, selectedCount }) => {
    return (
        <ProgressBar>
            <span>{selectedCount}/{size}</span>
            <span>Exit swipe</span>
        </ProgressBar>
    );
};
