import { db } from "../../firebase";

export const fetchLinks = () => async (dispatch) => {
  dispatch({ type: "FETCH_LINKS_REQUEST" });
  try {
    const querySnapshot = await db
      .collection("links")
      .where("active", "==", "Y")
      .get();
    const result = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    dispatch({ type: "FETCH_LINKS_SUCCESS", payload: result });
  } catch (err) {
    console.log(`error while fetching links db`, err);
  }
};
