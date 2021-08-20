import React, {useState} from "react";
import arrow from "./arrow.svg";
import blackArrow from "./greyArrow.svg";
import Cart from "./dropdownCard";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


const DropDown = styled.div`
  width: 151px;
  height: 36px;
  overflow: hidden;
  border-radius: 20px;
  // background-image: linear-gra
  // background-image: linear-gradient(180deg, rgba(24,24,24,0.83) 0%, rgba(19,19,19, 0.83) 100%);
  background-image: linear-gradient(90deg, rgba(24, 24, 24, 0.98) 0%, rgb(19, 19, 19) 100%);
  border: 0.75px solid #000000;
  padding: 8px 12px;
  position: absolute;
  top:16px;
  left:16px;
  bottom: 16px;
  backdrop-filter: blur(2px);
  
  &.light {
    border: 1px solid #D6D6D6;
    background-image: linear-gradient(rgba(239, 239, 239, 0.83), rgba(239, 239, 239, 0.83));
    backdrop-filter: blur(3px) grayscale(100%) saturate(1%);
  }
  
  transition: width .2s ease-in-out, height .2s ease-in-out, border-radius .2s ease-in-out;
  @media (max-width: 375px) and (max-height: 700px) {
        top: 12px;
        left: 13px;
   }
   
   @media (min-width: 1400px) {
     left: 32px;
   }
  .dropdown-btn{
    border: none;
    outline: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    background: transparent;
    padding: 0;
    margin: 0;
    width: 100%;
    p{
      width:100%;
      margin: 0;
      color: #ffffff;
      font-size: 16px;
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: normal;
      text-align: left;
      text-overflow: ellipsis;
      overflow:hidden;
    }
    img{
      transition: transform 200ms ease-in-out;
      transform: rotate(180deg);
      margin-left: 0px;
    }
    
    &.light {
      
      p {
       color: #000000;
       font-weight: 400;
      }
      
    }
    
  }
  .dropdown-header{
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    letter-spacing: normal;
    line-height: normal;
    text-align: center;
    margin-top: 0;
    margin-bottom: 13px;
    min-width: 274px;
  }
  .dropdown-content{
    opacity: 0;
  }
  &.dropped{
  transition: width .2s ease-in-out, height .2s ease-in-out, border-radius .2s ease-in-out;
  width: calc(100vw - 32px);
  height: calc(100vh - 32px);
  @media(min-width: 500px){
      width: calc(444px);
      height: calc(785px);
  }
  // @media (max-width: 414px) and (max-height: 896px) {
  //   height: calc(100vh - 32px)
  // }
  @media (max-width: 375px) and (max-height: 700px) {
        top: 12px;
        left: 13px;
        width: calc(100vw - 26px);
        height: calc(100vh - 24px);
    }
  border-radius: 8px;
    .dropdown-btn{
      img{
        transition: transform 200ms ease-in-out;
        transform: rotate(0deg);
      }
    }
    .dropdown-content{
      transition: opacity .57s ease-in-out .2s;
      height:100%;
      opacity: 1;
    }
  }
`;
const CardsContent = styled.div`
    max-height: calc(100% - 55px);
    overflow-y: auto;
`;


const initial = Array.from({ length: 6 }, (v, k) => k).map(k => {
    const custom = {
        id: `${k+2}`,
        content: `Quote ${k}`
    };

    return custom;
});

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    // console.log(result)
    return result;
};



function Quote({ quote, index }) {
    return (
        <Draggable draggableId={quote.id} index={index}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Cart/>
                </div>
            )}
        </Draggable>
    );
}

const QuoteList = React.memo(function QuoteList({ quotes }) {
    return quotes.map((quote, index) => (
        <Quote quote={quote} index={index} key={quote.id} />
    ));
});

const FileMenu = (props) => {
    const { darkTheme, changeSlide } = props;
    const [dropped, setDropped] = useState(false);

    const handleOpen = () => {
        setDropped(prevState => !prevState)
    }
    const [state, setState] = useState({ quotes: initial });
    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const quotes = reorder(
            state.quotes,
            result.source.index,
            result.destination.index
        );

        setState({ quotes: [...quotes] });
        changeSlide([...quotes])
    }

    // useEffect(() => {
    //     changeSlide(state.quotes)
    // },[])

    return (
        <DropDown className={`${darkTheme ? 'light' : ''} ${dropped ? 'dropped' : ''}`} >
            <button className={`${darkTheme ? 'light dropdown-btn' : 'dropdown-btn'}`} onClick={handleOpen}>
                <p>Me.link/AlexanderNewton</p>
                <img src={darkTheme ? blackArrow : arrow} alt="arrow"/>
            </button>
            <div className="dropdown-content">
                <CardsContent>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="list">
                            {provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <QuoteList quotes={state.quotes} />
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </CardsContent>
            </div>
        </DropDown>
    )
}

export default FileMenu