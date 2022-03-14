import React, {useContext, useState, useEffect, useMemo} from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "querystring";
import { useAuth } from "./FirebaseAuthContext";
import {
  fetchCategory,
  fetchCategorySavedDrops,
  fetchExternalCreators,
} from "../pages/home/actions";
import { getCategorySymbolByPosition } from "../utils/category";

const DropContext = React.createContext(null);

export function useDrop() {
  return useContext(DropContext);
}

export function DropProvider({ children }) {
  const [idToken, setIdToken] = useState(null);
  // const activeTabIndex = useSelector(state => state.category.general.activeTabIndex);
  const allCategories = useSelector(state => state.category);

  let curTab;

  if (window.location) {
    curTab = qs.parse(window.location.search, "?").tabs;
  }

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

    const symbol = curTab || getCategorySymbolByPosition(0, allCategories);

    dispatch(fetchCategorySavedDrops(idToken, symbol))
  }, [idToken, isCategoriesListEmpty])

  return (
    <DropContext.Provider value={null}>
      {children}
    </DropContext.Provider>
  );
}
