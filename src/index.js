import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./css/buttons.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
// import { AuthProvider } from "./contexts/FirebaseAuthContext";
// import { DropProvider } from "./contexts/DropContext";
import { Store } from "./store/Store";

ReactDOM.render(
  <React.StrictMode>
    {/* <AuthProvider> */}
      <Provider store={Store}>
        {/* <DropProvider> */}
          <App />
        {/* </DropProvider> */}
      </Provider>
    {/* </AuthProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
