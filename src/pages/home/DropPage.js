import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import DropDetail from '../../components/detail_page/DropDetail/DropDetail';
import DummyDropDetail from '../../components/detail_page/DropDetail/DummyDropDetail';
import HeaderBar from '../../components/elements/HeaderBar/HeaderBar';
import { useAuth } from "../../contexts/FirebaseAuthContext";
import * as DropMagnetAPI from "../../DropMagnetAPI";
import { data } from "../../utils/DummyCardData"

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

    if (id && id !== 'dummydrop123') {
      DropMagnetAPI.getDrop(id, '').then(function (response) {
        console.log(response)
        setDrop(response)
      })
    }
    else if(id === 'dummydrop123'){
      setDrop(data)
    }
  }, [id]);
  console.log(id, data)
  function renderDetail() {
    return (
      <div>
        {id !== 'dummydrop123' ? (
          <DropDetail
            goBack={() => history.push("/home")}
            drop={drop}
            closeDetailView={() => { }}
            handleClick={() => console.log("Click")} />
        ) : (
          <DummyDropDetail
            goBack={() => history.push("/home")}
            drop={drop}
            closeDetailView={() => { }}
            handleClick={() => console.log("Click")} />
        )}
      </div>
    )

  }


  return (
    <HomeContainer>
      <HeaderBar
        openHome={() => { }}
        openMenu={() => { }}
        isLogoNotVisible
        dropId={id}
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
