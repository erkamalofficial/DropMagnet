import "firebase/auth"

var host = 'https://drop-api-rnd454q4pa-ew.a.run.app/';

async function customAPICall(endpoint, data, method, access_token) {
  const uri = host + endpoint

  const res = await fetch(uri, {
    method: method,
    body: data === "" ? null : JSON.stringify(data),
    mode: 'cors', // no-cors, *cors, same-origin
    headers: {
      'Access-Control-Origin': '*',
      'Content-Type': 'application/json',
      'authorization': access_token !== '' ? `Bearer ${access_token}` : ''
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })

  if(res.status === 204){
    console.log(res)
    return null
  }
  else if(res.status >= 400){
    console.log(res)
    return res
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



// async function customAPICallAddDrop(endpoint, data, method, access_token) {
//   const formData = new FormData()

//   for (const name in data) {
//     if (name === 'content') {
//       data[name].map((image) => {
//         formData.append('content', image);
//       })
//     } else {
//       formData.append(name, data[name]);
//     }
//   }

//   const res = await fetch(host + endpoint, {
//     method: method,
//     body: data === "" ? null : formData,
//     mode: 'cors', // no-cors, *cors, same-origin
//     headers: {
//       'Authorization': `Bearer ${access_token}`
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//   })
//   return res.json()
// }

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
      'authorization': `Bearer ${access_token}`
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
  return res
}



// User profile

export function isUser(email) {
  const userProfileEndpoint = `profiles/check`
  const payload = {
    email: email
  }
  return customAPICall(userProfileEndpoint, payload, "POST", "")
}

export function checkUsername(u) {
  const usernameEndpoint = `profiles/username/check?u=${u}`
  return normalAPICall(usernameEndpoint, "", "POST", "")
}

// export function createNewUserProfile(name, username, email, token) {
export function createNewUserProfile(name, username, token) {
  const profilesEndpoint = 'profiles'
  const payload = {
    name,
    username,
    // email
  }
  return customAPICall(profilesEndpoint, payload, "POST", token)
}

export function getUserProfile(profile_id, token) {
  const userProfileEndpoint = 'profiles/' + profile_id
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

export function updateTokens(artistId) {
  const updateEndpoint = `profiles/artist/${artistId}`
  return normalAPICall(updateEndpoint, {}, "POST", '')
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

export function getTokens(artistId, idToken) {
  const getTokensEndpoint = `drops/tokens/${artistId}`
  return customAPICall(getTokensEndpoint, '', "GET", idToken)
}


// Drop creation


// export function createDrop(title, desc, category, drop_date, marketplace, link, pieces, price, auction_price, files, access_token) {
//   const createDropEndpoint = 'drops'
//   const content = files;

//   const payload = {
//     title,
//     desc,
//     category,
//     drop_date,
//     marketplace,
//     link,
//     pieces,
//     price,
//     auction_price,
//     content
//   }
//   return customAPICallAddDrop(createDropEndpoint, payload, "POST", access_token)
// }

export function deleteDrop(dropId, token){
  const deleteDropEndPoint = `drops/delete/${dropId}`
  return customAPICall(deleteDropEndPoint, {}, "DELETE", token)
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
  // const feedDropsEndpoint = `external_creators`
  return customAPICall(feedDropsEndpoint, "", "GET", extras.token)
}

export function getFeeds2(id, extras) {
  const feedDropsEndpoint = `drops?user_id=${id}&index=${extras.curTime}`
  return customAPICall(feedDropsEndpoint, "", "GET", extras.token)
}

export function getEC(extras) {
  const feedDropsEndpoint = `external_creators`
  return customAPICall(feedDropsEndpoint, "", "GET", extras.token)
}

export function getOneEC(id, extras) {
  const feedDropsEndpoint = `external_creators/${id}`
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

export function getCategorySavedDrops(token = '', symbol) {
  const getSaveDropEndPoint = `drops/saved?symbol=${symbol}`;
  return customAPICall(getSaveDropEndPoint, "", "GET", token);
}

export function unsaveDrop(token = '', dropid = '') {
  const unsaveDropEndPoint = `drops/${dropid}/unsave`;
  return customAPICall(unsaveDropEndPoint, "", "POST", token);
}



// Wallet Login

export function getNonce(address, chain) {
  // const nonceEndPoint = `profiles/user/nonce?address=${address}`;
  let nonceEndPoint = `auth/creds?addr=${address}`
  if(chain) {
    nonceEndPoint = `${nonceEndPoint}&chain=${chain}`
  }
  return customAPICall(nonceEndPoint, "", "POST", '');
}

export function getWalletUser(address) {
  const userEndPoint = `profiles/getUser?address=${address}`;
  return customAPICall(userEndPoint, "", "GET", '');
}

export function createWalletUser(username, name, address, token) {
  // const userEndPoint = `profiles/createUser`;
  const userEndPoint = `profiles`;
  const payload = {
    username: username,
    name: name,
    address: address
  }
  return customAPICall(userEndPoint, payload, "POST", token);
}

// MetaURLs API

export function createMetaURL(data, idToken) {
  const endPoint = `metaurls`;
  const payload = {
    url: data.url,
    name: data.name,
    privacy: data.privacy,
    nfts: data.nfts
  }
  return customAPICall(endPoint, payload, "POST", idToken);
}

export function getUserMetaURLs(idToken) {
  const endPoint = `metaurls`;
  return customAPICall(endPoint, '', "GET", idToken);
}

export function getMetaURLById(id) {
  const endPoint = `metaurls/${id}`;
  return customAPICall(endPoint, '', "GET", "");
}

export function connectWalletToMetaURL(data, id, idToken) {
  const endPoint = `metaurls/connect/${id}`;
  const payload = {
    address: data.address,
    secret: data.secret
  }
  return normalAPICall(endPoint, payload, "PUT", idToken);
}

export function removeWalletFromMetaURL(data, id, idToken) {
  const endPoint = `metaurls/remove/${id}`;
  const payload = {
    address: data.address
  }
  return normalAPICall(endPoint, payload, "PUT", idToken);
}

export function selectWalletForMetaURL(data, id, idToken) {
  const endPoint = `metaurls/select/${id}`;
  const payload = {
    address: data.address
  }
  return normalAPICall(endPoint, payload, "PUT", idToken);
}

export function verifyWalletForMetaURL(data, id, idToken) {
  const endPoint = `metaurls/verify/${id}`;
  const payload = {
    address: data.address
  }
  return normalAPICall(endPoint, payload, "PUT", idToken);
}

export function editMetaURLPrivacy(data, id, idToken) {
  const endPoint = `metaurls/privacy/${id}`;
  const payload = data
  return normalAPICall(endPoint, payload, "PUT", idToken);
}

export function generateQR(address) {
  const endPoint = `metaurls/address/getqr`;
  const payload = {
    address: address
  }
  return customAPICall(endPoint, payload, "POST", "");
}

export function verifyCode(secret, token) {
  const endPoint = `metaurls/address/verifyqr`;
  const payload = {
    secret: secret,
    token: token 
  }
  return customAPICall(endPoint, payload, "POST", "");
}

export function verifyPassword(id, password) {
  const endPoint = `metaurls/password/verify/${id}?p=${password}`;
  return normalAPICall(endPoint, {}, "POST", "");
}