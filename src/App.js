import React from 'react'
import { Route, Switch } from "react-router-dom";

import './App.css'
const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));
const PaginationPage = React.lazy(() => import("./Pages/PaginationPage"));
const SigninSignupPage = React.lazy(() => import("./Pages/SigninSignupPage"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute/ProtectedRoute"));


function App() {

  return (
    <>
      <React.Suspense
        fallback={
          <div className="dashboardBlurImage">
            <center>
              <h4>Medifusion is loading, Please wait...</h4>
            </center>
          </div>
        }
      >
        <Navbar />
        <Switch>

          <Route exact path="/login">
            <SigninSignupPage />
          </Route>
          <ProtectedRoute exact path="/">
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/pagination">
            <PaginationPage />
          </ProtectedRoute>


        </Switch>
      </React.Suspense>
    </>
  );
}

export default App;
