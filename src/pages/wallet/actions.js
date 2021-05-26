import { db } from "../../firebase";

export const fetchLinks = () => async (dispatch) => {
  dispatch({ type: "FETCH_LINKS_REQUEST" });
  try {
    const querySnapshot = await db
      .collection("links")
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

export const makePayment = (
  token,
  idToken,
  priceForStripe,
  selectedLinksIds
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
      updateLinks(idToken, selectedLinksIds);
    })
    .catch((error) => {
      console.log("Payment Error: ", error);
    });
};

export const updateLinks = (idToken, linkIds) => {
  const url = "http://localhost:8080/links";
  // const url = "https://drop-backend-rnd454q4pa-ew.a.run.app/links";
  fetch(url, {
    method: "post",
    body: JSON.stringify({
      uids: linkIds,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  })
    .then((response) => {
      console.log("Links updated", response);
    })
    .catch((error) => {
      console.log(" Error: ", error);
    });
};
