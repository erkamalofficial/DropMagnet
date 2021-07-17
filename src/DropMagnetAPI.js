import firebase from "firebase/app"
import "firebase/auth"
import { useAuth } from "../src/contexts/FirebaseAuthContext"

var host;

if (process.env.NODE_ENV === "development") {
  // local dev
  host = 'https://drop-backend-rnd454q4pa-ew.a.run.app/';
} else {
  // pick up from .env
  host = 'https://drop-backend-rnd454q4pa-ew.a.run.app/';
}

async function customAPICall(endpoint, data, method, access_token) {

  const uri = host + endpoint

  // Firebase Auth Token
  // console.log('endpoint', uri)
  // console.log('data is', JSON.stringify(data))
  // console.log('access token', access_token)

  const res = await fetch(uri, {
    method: method,
    body: data === "" ? null : JSON.stringify(data),
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })

  return res.json()
}


async function customAPICallAddDrop(endpoint, data, method, access_token) {

  const uri = host + endpoint
    // Firebase Auth Token
    console.log('endpoint', uri)
  console.log('data is', JSON.stringify(data))
  console.log('access token', access_token)

  const formData = new FormData()

  for (const name in data) {
    if(name === 'content'){
      data[name].map((image)=>{
        formData.append('content',image);
      })
    }
    formData.append(name, data[name]);
  }

  const res = await fetch(uri, {
    method: method,
    body: data === "" ? null : formData,
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Authorization': `Bearer ${access_token}`
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  return res.json()
}

// User profile

export function createNewUserProfile(name, username, email, token) {
  const profilesEndpoint = 'profiles'
  const payload = {
    name,
    username,
    email
  }
  return customAPICall(profilesEndpoint, payload, "POST", token)
}

export function getUserProfile(profile_id, token) {
  const userProfileEndpoint = 'profiles' + '/' + profile_id
  return customAPICall(userProfileEndpoint, "", "GET", token)
}

export function getUserPosts(profile_id, token) {
  const userDropsEndpoint = `drops?user_id=${profile_id}`
  return customAPICall(userDropsEndpoint, "", "GET", token)
}

export function changeUserImage(image, access_token) {
  const createDropImageEndpoint = 'create_drop_image'
  const payload = {
    image
  }
  return customAPICall(createDropImageEndpoint, payload, "POST", access_token)
}

export function updateUserDetails(field, value, access_token) {
  const updateEndpoint = `profiles/${field}?v=${value}`
  return customAPICall(updateEndpoint, {}, "PUT", access_token)
}


// Drop creation


export function createDrop(title, desc, category, hashtag, drop_date,  marketplace, marketplaceProfileLink, piecesInDrop, access_token, listingType, price, auction_price, files) {
  const createDropEndpoint = 'drops'
  const content = files;

  const payload = {
    title,
    desc,
    category,
    // hashtag,
    drop_date,
    marketplace,
    // marketplaceProfileLink,
    // piecesInDrop,
    // listingType,
    price,
    auction_price,
    content
  }
  return customAPICallAddDrop(createDropEndpoint, payload, "POST", access_token)
}

export function createDropImage(image) {
  const createDropImageEndpoint = 'create_drop_image'
  const payload = {
    image
  }
  return customAPICall(createDropImageEndpoint, payload, "POST")
}


// Get Feed

export function getFeeds(category, extras, past) {
  const feedDropsEndpoint = `drops/feed?index=${extras.curTime}&category=${category}&past=${past}`
  return customAPICall(feedDropsEndpoint, "", "GET", extras.token)
}

export function getDrop(id, token) {
  const dropEndpoint = `drops/${id}`
  return customAPICall(dropEndpoint, "", "GET", token)
}


export function saveDrop(token = '', dropid = '') {
  const saveDropEndPoint = `drops/${dropid}/save`;
  return customAPICall(saveDropEndPoint, "", "POST", token);
}

export function getSaveDrops(token = '') {
  const getSaveDropEndPoint = `drops/saved`;
  return customAPICall(getSaveDropEndPoint, "", "GET", token);
}

export function unsaveDrop(token = '', dropid = '') {
  const unsaveDropEndPoint = `drops/${dropid}/unsave`;
  return customAPICall(unsaveDropEndPoint, "", "POST", token);
}



// Wallet Login

export function getNonce(address) {
  const nonceEndPoint = `profiles/user/nonce?address=${address}`;
  return customAPICall(nonceEndPoint, "", "POST", '');
}

export function getWalletUser(address) {
  const userEndPoint = `profiles/getUser?address=${address}`;
  return customAPICall(userEndPoint, "", "GET", '');
}