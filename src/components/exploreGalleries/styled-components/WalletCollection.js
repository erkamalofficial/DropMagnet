import styled from "styled-components";
import circle from "../assets/circle.svg";
import pin from "../assets/pin.svg"
import {NavLink} from "react-router-dom";

export const ButtonWrapper = styled.button`
  max-width: 321px;
  width:100%;
  margin: 0 auto;
  height: 62px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 -4px 0 #161616;
  border-radius: 10px;
  background-image: linear-gradient(180deg, #2e2e2e 0%, #1e1e1e 100%);
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  color: #eaeaea;
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  padding-left:12px;
  padding-right:25px;
  margin-bottom: 25px;
  @media(max-width: 374px) {
  padding-left:5px;
        padding-right:10px
      }
`;
const CardIcon = styled.div`
  width: 47px;
  height: 46px;
  border-radius: 100px;
  box-shadow: 0 3px 4px #191919, inset 0 1px 3px rgba(0, 0, 0, 0.5), inset 0 2px 5px rgba(0, 0, 0, 0.5);
  background-image: url(${circle});
  background-position: center;
  overflow:hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  @media(max-width: 374px) {
    width: 37px;
    height: 37px;
    img{
      margin-top: 5px;
      width: 19px
    }
  }
`;


const NavBtn = styled(NavLink)`
   text-decoration: none;
`;

const WalletCollection = () => {
    return (
        <NavBtn to="/explore-galleries/connected-wallets">
            <ButtonWrapper>
                <CardIcon>
                    <img src={pin} alt="icon"/>
                </CardIcon>
                Wallet Connections
            </ButtonWrapper>
        </NavBtn>
    )
}

export default WalletCollection