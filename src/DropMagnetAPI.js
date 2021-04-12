var host;

if (process.env.NODE_ENV === "development") {
  // local dev
  host = 'http://localhost:2001/api/';
} else {
  // pick up from .env
  host = process.env.REACT_APP_API_URL;
}

async function customAPICall(endpoint, data, method, access_token) {
  const uri = host + endpoint
  console.log('endpoint', uri)
  console.log('data is', JSON.stringify(data))

  const res = await fetch(uri, {
    method: method,
    body: JSON.stringify(data),
    mode: 'cors', // no-cors, *cors, same-origin
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + access_token
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  return res.json()
}

// Login endpoint

export function loginUser(email, password) {
  const loginEndpoint = 'login'
  const payload = {
    email,
    password
  }
  return customAPICall(loginEndpoint, payload, "POST")
}

// Signup endpoints

export function signup(handle, email, password) {
  const signupEndpoint = 'signup'
  const payload = {
    handle,
    email,
    password
  }
  return customAPICall(signupEndpoint, payload, "POST")
}

export function setUserDetails(userId, firstName, lastName, bio) {
  const userDetailsEndpoint = 'users' + '/' + userId + '/' + 'user_details'
  const payload = {
    firstName,
    lastName,
    bio
  }
  return customAPICall(userDetailsEndpoint, payload, "POST")
}

export function refresh(refresh_token) {
  const refreshEndpoint = 'refreshtoken'
  const payload = {
    refresh_token
  }
  return customAPICall(refreshEndpoint, payload, "POST")
}

// Main dashboard endpoints

export function getPosts(access_token, date) {
  const postsEndpoint = 'drops'
  const payload = {
    date
  }
  return customAPICall(postsEndpoint, payload, "GET", access_token)
}

export function getPost(access_token, post_id) {
  const dropEndpoint = 'drop_detail'
  const payload = {
    post_id
  }
  return customAPICall(dropEndpoint, payload, "GET", access_token)
}

// User profile

export function getUserProfile(profile_id) {
  const userProfileEndpoint = 'user_profile'
  return customAPICall(userProfileEndpoint, profile_id, "GET")
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
