import React from "react";
import styled from "styled-components";
import {Row} from "../../styled-component/row";
import cardImg from "../../assets/card-img.png";

const Card = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 8px;
  background-color: #3b99a8;
  position: relative;
  padding: 8px 8px 12px 12px;
  background-position: center;
  margin-bottom: 32px;
  &.slider-item{
  margin-top:32px;
  margin-bottom: 32px;
  }
`;
const TopCircle = styled.div`
  width: 31px;
  height: 31px;
  background-color: rgba(40, 40, 40, 0.54);
  border-radius: 50px;
`;
const Nfts = styled.p`
  color: #eaeaea;
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: left;
  margin: 0;
  border-radius: 50px;
  background-color: rgba(40, 40, 40, 0.54);
  padding: 4px 12px;
`;

const Title = styled.p`
  color: #eaeaea;
  font-size: 18px;
  font-weight: 700;
  font-style: normal;
  letter-spacing: normal;
  line-height: normal;
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 150px;
  height: 25px;
  border-radius: 100px;
  background-color: rgba(40, 40, 40, 0.54);
`;

const ArtGalleryCard = ({className}) => {
    return (
        <Card style={{backgroundImage: `url(${cardImg})`}} className={className}>
            <Row className="items-center justify-between">
                <TopCircle />
                <Nfts>
                    10 NFTs
                </Nfts>
                <Title>
                    Crypto Art Man
                </Title>
            </Row>
        </Card>
    )
}

export default ArtGalleryCard