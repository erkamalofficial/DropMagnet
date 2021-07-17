import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import DropDetail from '../../components/detail_page/DropDetail/DropDetail';
import HeaderBar from '../../components/elements/HeaderBar/HeaderBar';
import { useAuth } from "../../contexts/FirebaseAuthContext";
import * as DropMagnetAPI from "../../DropMagnetAPI";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div.rel {
    position: relative;
    user-select: none;
    padding-top: var(--main-header-margin-top);
    @media (max-width: 500px) {
      padding-top: 10px
    }
  }
`;


const DropPage = () => {

    let { id } = useParams()
    let history = useHistory()
    const [drop, setDrop] = useState(null)

    const { currentUser } = useAuth();

    useEffect(() => {
        if (id) {
            currentUser
                .getIdToken(false)
                .then(function (idToken) {
                    DropMagnetAPI.getDrop(id, idToken).then(function (response) {
                        console.log(response)
                        setDrop(response)
                    })
                        .catch(function (error) { });
                })
        }
    }, [id]);

    function renderDetail() {
        return (
          <div>
            <DropDetail
              goBack={() => history.push("/home")}
              drop={drop}
              closeDetailView={() => {}}
              handleClick={() => console.log("Click")} />
          </div>
        )
      }


    return (
        <HomeContainer>
            <HeaderBar
                openHome={() => { }}
                openMenu={() => { }}
                isLogoNotVisible
            />
            <div className="rel">
                <div className="view-container home-container" id="detCnt" >
                    {drop && renderDetail()}
                </div>
            </div>
        </HomeContainer>
    )
}

export default DropPage
