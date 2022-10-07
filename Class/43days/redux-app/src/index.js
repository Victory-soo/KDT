import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./store";

// const weight = 65;

// function reducer(state = weight, action) {
//     if (action.type === "증가") {
//         state++;
//         return state;
//     } else if (action.type === "감소") {
//         state--;
//         return state;
//     } else {
//         return state;
//     }
// }

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
let store = createStore(rootReducer, reduxDevtools);
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <>
        <Provider store={store}>
            <App />
        </Provider>
    </>
);

reportWebVitals();
