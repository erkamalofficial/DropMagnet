import styled from "styled-components";


export const StepTitle = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 9px 5px 11px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -4px 0 #161616;
  border-radius: 10px;
  background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  color: #eaeaea;
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  display: flex;
  align-items:center;
  flex-direction: column;
  justify-content: center;
  span{
    display: block;
    font-size: 22px;
    font-weight: 500;
  }
  @media(max-width: 374px) {
    font-size: 22px;
    span{
     font-size: 18px;
    }
  }
`