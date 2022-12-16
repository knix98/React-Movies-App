import React from "react";
import ReactDOM from "react-dom/client";
import { legacy_createStore as createStore, applyMiddleware } from "redux";

import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers";

// //redux will internally call the below function like this : logger(obj)(next)(action)
// //obj is passed to the logger internally by redux
// //obj is an object containing the dispatch and getState of store
// const logger = function({dispatch, getState}) {
//   return function(next){
//     return function(action) {
//       //middleware code
//       console.log('ACTION_TYPE = ', action.type);

//       //next() will call the next middleware in line, or will call the dispatch func if this was last middleware
//       next(action);
//     }
//   }
// }

//another way of writting the above middleware
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    //middleware code
    console.log("ACTION_TYPE = ", action.type);

    //next() will call the next middleware in line, or will call the dispatch func if this was last middleware
    next(action);
  };

const store = createStore(rootReducer, applyMiddleware(logger));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
