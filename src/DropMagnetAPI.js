import { ContactlessOutlined } from "@material-ui/icons";
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
  const res = await fetch(uri, {
    method: method,
    body: data === "" ? null : JSON.stringify(data),
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      'Authorization': access_token !== '' ? `Bearer ${access_token}` : ''
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })

  if(res.status === 204){
    return null
  }
  return res.json()
}


async function normalAPICall(endpoint, data, method, access_token) {

  const uri = host + endpoint
  const res = await fetch(uri, {
    method: method,
    body: data === "" ? null : JSON.stringify(data),
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Content-Type': 'application/json',
      'Authorization': access_token !== '' ? `Bearer ${access_token}` : ''
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  return res
}



async function customAPICallAddDrop(endpoint, data, method, access_token) {

  const uri = host + endpoint
  // Firebase Auth Token

  const formData = new FormData()

  for (const name in data) {
    if (name === 'content') {
      data[name].map((image) => {
        formData.append('content', image);
      })
    } else {
      formData.append(name, data[name]);
    }
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

async function customAPICallUpdateAvatar(endpoint, data, method, access_token) {

  const uri = host + endpoint
  // Firebase Auth Token

  const formData = new FormData()

  for (const name in data) {
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
  return res
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
  return normalAPICall(updateEndpoint, {}, "PUT", access_token)
}

export function updateUserAvatar(imageFile, imageType, access_token) {
  const updateEndpoint = `profiles/avatar`
  const payload = {
    name: 'avatar',
    avatar: imageFile,
    content_type: imageType,
  }
  return customAPICallUpdateAvatar(updateEndpoint, payload, "PUT", access_token)
}

export function updateSubscription(field, value, access_token) {
  const updateEndpoint = `profiles/${field}?v=${value}`
  return normalAPICall(updateEndpoint, {}, "PUT", access_token)
}

export function updateTokens(artistId) {
  const updateEndpoint = `profiles/artist/${artistId}`
  return normalAPICall(updateEndpoint, {}, "POST", '')
}


// Drop creation


export function createDrop(title, desc, category, drop_date, marketplace, link, price, auction_price, files, access_token) {
  const createDropEndpoint = 'drops'
  const content = files;

  const payload = {
    title,
    desc,
    category,
    drop_date,
    marketplace,
    link,
    price,
    auction_price,
    content
  }
  return customAPICallAddDrop(createDropEndpoint, payload, "POST", access_token)
}

export function saveDropLink(link, dropId, token){
  const saveDropLinkEndpoint = `drops/${dropId}/link?l=${link}`
  return normalAPICall(saveDropLinkEndpoint, {}, "PUT", token)
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
  return customAPICall(dropEndpoint, "", "GET", '')
}

export function getVideoDrop() {
  const dropEndpoint = `videoDrop`
  return customAPICall(dropEndpoint, "", "GET", '')
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

export function createWalletUser(username, name, address) {
  const userEndPoint = `profiles/createUser`;
  const payload = {
    username: username,
    name: name,
    address: address
  }
  return customAPICall(userEndPoint, payload, "POST", "");
}


// 2-Factor Auth

export function generateQR(address) {
  const endPoint = `getqr`;
  const payload = {
    address: address
  }
  return customAPICall(endPoint, payload, "POST", "");
}

export function verifyCode(secret, token) {
  const endPoint = `verifyqr`;
  const payload = {
    secret: secret,
    token: token 
  }
  return customAPICall(endPoint, payload, "POST", "");
}