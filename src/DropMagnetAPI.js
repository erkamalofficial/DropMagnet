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
  console.log('endpoint', uri)
  console.log('data is', JSON.stringify(data))
  console.log('access token', access_token)

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

export function changeUserImage(image, access_token) {
  const createDropImageEndpoint = 'create_drop_image'
  const payload = {
    image
  }
  return customAPICall(createDropImageEndpoint, payload, "POST", access_token) 
}

// Drop creation

export function createDrop(title, storyOfDrop, category, hashtag, launchDate, marketplace, marketplaceProfileLink, piecesInDrop, access_token, listingType, price) {
  const createDropEndpoint = 'create_drop'
  const payload = {
    title,
    storyOfDrop,
    category,
    hashtag,
    launchDate,
    marketplace,
    marketplaceProfileLink,
    piecesInDrop,
    listingType,
    price
  }
  return customAPICall(createDropEndpoint, payload, "POST", access_token)
}

export function createDropImage(image) {
  const createDropImageEndpoint = 'create_drop_image'
  const payload = {
    image
  }
  return customAPICall(createDropImageEndpoint, payload, "POST") 
}
