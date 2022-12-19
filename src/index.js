import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

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
    if (typeof action !== "function") {
      console.log("ACTION_TYPE = ", action.type);
    }

    //next() will call the next middleware in line, or will call the dispatch func if this was last middleware
    next(action);
  };

// const thunk =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     //if action is not an object, but a function...
//     if(typeof action === 'function'){
//       action(dispatch);
//       return;
//     }

//     //if action is an object only then simply next() will be called
//     //next() will call the next middleware in line, or will call the dispatch func if this was last middleware
//     next(action);
//   };

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export const StoreContext = createContext();

class Provider extends React.Component {
  render() {
    const { store } = this.props;
    return (
      //all the components in the app using value=store using  StoreContext.Consumer will be re-rendered whenever the value=store updates/changes
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
