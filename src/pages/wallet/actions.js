import { db } from "../../firebase";

export const fetchLinks = () => async (dispatch) => {
  dispatch({ type: "FETCH_LINKS_REQUEST" });
  try {
    const querySnapshot = await db
      .collection("links_v1")
      .where("active", "in", ["Y", "S"])
      .get();
    const result = [];
    querySnapshot.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() };
      result.push(data);
    });
    dispatch({ type: "FETCH_LINKS_SUCCESS", payload: result });
  } catch (err) {
    console.log(`error while fetching links db`, err);
  }
};

export const fetchAvailableDomainHandle =
  (domainPathList, galleryName) => async (dispatch) => {
    dispatch({ type: "FETCH_AVAILABLE_LINKS_REQUEST", payload: galleryName });
    try {
      const linkPromises = await domainPathList.map(async (domain) => {
        const result = await db.collection(domain.path).get();
        return {
          [domain.id]: result.docs.length,
        };
      });
      const result = await Promise.all(linkPromises);
      dispatch({ type: "FETCH_AVAILABLE_LINKS_SUCCESS", payload: result });
    } catch (err) {
      console.log(`error while fetching links db`, err);
    }
  };

export const makePayment = (
  token,
  idToken,
  priceForStripe,
  selectedLinksIds,
  uid
) => {
  const url = "http://localhost:8080/payments";
  // const url = "https://drop-backend-rnd454q4pa-ew.a.run.app/payments";
  fetch(url, {
    method: "post",
    body: JSON.stringify({
      amount: priceForStripe,
      token: token,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  })
    .then((response) => {
      console.log("succesful payment", response);
      updateLinks(idToken, selectedLinksIds, uid);
    })
    .catch((error) => {
      console.log("Payment Error: ", error);
    });
};

export const updateLinks = (idToken, linkIds, uid) => {
  const url = "http://localhost:8080/links";
  // const url = "https://drop-backend-rnd454q4pa-ew.a.run.app/links";
  fetch(url, {
    method: "post",
    body: JSON.stringify({
      domainFullPath: linkIds,
      userId: uid,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  })
    .then((response) => {
      console.log("Links updated");
    })
    .catch((error) => {
      console.log(" Error: ", error);
    });
};
