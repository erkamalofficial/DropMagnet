import styled from "styled-components";
import FixedHeader from "../../components/elements/HeaderBar/FixedHeader";
import { useEffect } from "react";

const SignupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
`;
const SignupWrapperContents = styled.div`
  margin-top: 72px;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;
const WhitePageLabel = styled.div`
  background: linear-gradient(to left, #ac43f1, #6620de);
  border-radius: 40px;
  display: inline-block;
  font-size: 20px;
  padding: 1px;
  text-decoration: none;

  span {
    background-color: rgba(0, 0, 0, 0.88);
    display: block;
    padding: 10px 24px;
    border-radius: 40px;
    font-size: var(--font-size-s);
    @media (max-width: 320px) {
      padding: 5px 12px;
      font-size: 12px;
      line-height: 24px;
      display: inline-block;
    }
  }
`;
const SignupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;
const SignupTitle = styled.div`
  font-size: 32px;
  color: #eaeaea;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
`;
const SignupFormLabel = styled.label`
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: 700;
`;
const SignupFormInput = styled.input`
  font-size: 18px;
  margin-bottom: 18px;
  color: #c0c0c0;
  font-size: 18px;
  font-weight: 500;
  text-align: left;

  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  background-color: #171718;
  :last-of-type {
    margin-bottom: 40px;
  }
`;
const ContinueBtn = styled.button`
  /* Style for "Rectangle" */
  width: 100%;
  height: 44px;
  box-shadow: 0 3px 25px rgba(57, 30, 125, 0.2), inset 0 -2px 0 #610bc8;
  border-radius: 8px 8px 0;
  border: 1px solid #610bc8;
  background-color: #152230;
  color: #eaeaea;
  font-weight: 700;
`;
const Recaptcha = styled.div`
  margin-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoSection = styled.div`
  display: flex;
`;
const BrandLogo = styled.img`
  height: 36px;
  width: 36px;
`;
const LogoTitleSection = styled.div`
  padding-left: 20px;
`;
const LogoTitle = styled.div`
  font-family: var(--font-bdcols);
  font-weight: 400;
  font-size: var(--font-size-l);
`;
export default function Signup(props) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    // script.onload = () => this.scriptLoaded();
    document.body.appendChild(script);
  }, []);
  return (
    <SignupWrapper>
      <FixedHeader {...props} />
      <SignupWrapperContents>
        <SignupHeader>
          <LogoSection>
            <BrandLogo src="./drop_icon.png" alt="drop magnet" />
            <LogoTitleSection>
              <LogoTitle>drop magnet</LogoTitle>
              <div>#ThreeTheWeb</div>
            </LogoTitleSection>
          </LogoSection>
          <WhitePageLabel>
            <span>White Paper</span>
          </WhitePageLabel>
        </SignupHeader>
        <SignupTitle> Sign Up to Claim your URLs</SignupTitle>
        <SignupFormLabel> Email address </SignupFormLabel>
        <SignupFormInput placeholder="Enter your email address" />
        <SignupFormLabel> Password </SignupFormLabel>
        <SignupFormInput placeholder="Enter your password" />
        <SignupFormLabel> Phone number </SignupFormLabel>
        <SignupFormInput placeholder="Enter your phone number" />
        <form action="?" method="POST">
          <Recaptcha
            className="g-recaptcha"
            data-sitekey="6LdwptUUAAAAAEDa0ydtiwVQCtd3Mjw0DUk0VNDt"
          ></Recaptcha>
          <ContinueBtn type="submit"> Continue </ContinueBtn>
        </form>
      </SignupWrapperContents>
    </SignupWrapper>
  );
}
