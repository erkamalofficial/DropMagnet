import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import categoryReducer from "./category";
import { OpenReducer } from "./OpenCard";

// const rootReducer = combineReducers({
//   category: categoryReducer,
//   card: OpenReducer,
// });

// export default createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
