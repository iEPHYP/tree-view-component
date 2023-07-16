import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider as ReduxStoreProvider } from "react-redux";

import { saveTreeItems, loadTreeItems } from "./localStorage";

import "./index.css";
import App from "./App";

import { rootReducer } from "./redux";

const store = createStore(rootReducer, {
  treeItems: loadTreeItems(),
  treeItemIdOnEditMode: null,
});

store.subscribe(async () => {
  saveTreeItems(store.getState().treeItems);
});

ReactDOM.render(
  <React.StrictMode>
    <ReduxStoreProvider store={store}>
      <App />
    </ReduxStoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
