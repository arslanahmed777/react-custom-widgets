import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/Store"
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>

        <PersistGate persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>

        </PersistGate>

      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
