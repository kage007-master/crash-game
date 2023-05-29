import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./App.css";
import Main from "app/pages/Main";
import SocketProvider from "./app/providers/socket";
import MultiversXProvider from "app/providers/MultiversXProvider";

import Modals from "./app/modals";
import ToastrProvider from "app/providers/ToastrProvider";

const App = () => {
  return (
    <MultiversXProvider>
      {/* <React.StrictMode> */}
      <Provider store={store}>
        <SocketProvider />
        <ToastrProvider>
          <Main />
          <Modals></Modals>
        </ToastrProvider>
      </Provider>
      {/* </React.StrictMode> */}
    </MultiversXProvider>
  );
};

export default App;
