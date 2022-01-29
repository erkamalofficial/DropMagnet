import React, {useContext, useState, useEffect, useMemo} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "./FirebaseAuthContext";
import { fetchCategory, fetchExternalCreators, fetchReswipeBuckets } from "../pages/home/actions";

const DropContext = React.createContext(null);

export function useDrop() {
  return useContext(DropContext);
}

export function DropProvider({ children }) {
  const [idToken, setIdToken] = useState(null);
  const allCategories = useSelector(state => state.category.allCategories);

  const { currentUser } = useAuth();
  const dispatch = useDispatch();

  const isCategoriesListEmpty = useMemo(() => {
    return !allCategories.categories.length && !allCategories.external_creators.length;
  }, [allCategories])

  useEffect(() => {
    dispatch(fetchCategory());

    currentUser && currentUser.getIdToken().then((idToken) => {
      setIdToken(idToken);

      let extras = {
        token: idToken,
        userID: "",
        random: true
      };

      dispatch(fetchExternalCreators({ extras }))
    });
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (isCategoriesListEmpty) return;

    dispatch(fetchReswipeBuckets(idToken));
  }, [idToken, isCategoriesListEmpty])

  return (
    <DropContext.Provider value={null}>
      {children}
    </DropContext.Provider>
  );
}
