import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import * as DropMagnetAPI from '../../DropMagnetAPI'

export default function DropCreation(props) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [dropDate, setDropDate] = useState('')
  const [marketplace, setMarketplace] = useState('')
  const [marketplaceId, setMarketplaceId] = useState('')
  const [dropPieces, setDropPieces] = useState('')

  function createDrop(title, description, category, dropDate, marketplace, marketplaceId, dropPieces) {
    DropMagnetAPI.createDrop(title, description, category, dropDate, marketplace, marketplaceId, dropPieces).then(function (response) {
      if (response.status === "error") {
        // setLoginError(response.message);
      } else {
        // setLoginError('');
        props.saveCredentials(response.access_token, response.refresh_token);
        // history.push("/home");
      }
    });
  }


  return (
    <div>
    </div>
  );
}