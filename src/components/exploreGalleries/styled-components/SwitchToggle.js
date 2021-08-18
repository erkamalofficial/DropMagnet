import React from "react"
import styled from "styled-components";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";

const Switch = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
      width: 117px;
      height: 53px;
      padding: 5px 9px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -1px 0 #002b40;
      border-radius: 42px;
      background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);
      @media(max-width: 374px){
        width: 98px;
        height: 46px;
      }
`;

const CheckBoxsWrapper = styled.div`
  position: relative;
  width: 43px;
  height: 43px;
  @media(max-width: 374px){
    width: 37px;
    height: 37px;
  }
`;
const RadioBoxLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 100px;
  background: transparent;
  cursor: pointer;
  img{
    height: 28px;
  }
  @media(max-width: 374px){
        img{
        width: 25px;
        height: 25px;
        }
      }
`;
const RadioBox = styled.input`
    display:none;
    &:checked + label{
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 3px rgba(0, 0, 0, 0.5);
          border-radius: 23px;
          background-color: #141414;
    }
`;

const SwitchToggle = () => {
    return (
        <div>
            <Switch>
                <CheckBoxsWrapper>
                    <RadioBox type="radio" id="light" name="lightOrNight" />
                    <RadioBoxLabel htmlFor="light">
                        <img src={sun} alt="icon"/>
                    </RadioBoxLabel>
                </CheckBoxsWrapper>
                <CheckBoxsWrapper>
                    <RadioBox type="radio" id="dark" name="lightOrNight" defaultChecked={true}/>
                    <RadioBoxLabel htmlFor="dark">
                        <img src={moon} alt="icon"/>
                    </RadioBoxLabel>
                </CheckBoxsWrapper>
            </Switch>
        </div>

    )
}

export default SwitchToggle