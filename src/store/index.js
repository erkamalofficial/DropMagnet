import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import categoryReducer from "./category";

const rootReducer = combineReducers({
  category: categoryReducer,
});

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
