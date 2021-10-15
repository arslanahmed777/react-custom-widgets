import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from './redux/User/User.Selectors';
import './App.css'
const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const HomePage = React.lazy(() => import("./Pages/HomePage"));
const PaginationPage = React.lazy(() => import("./Pages/PaginationPage"));
const SigninSignupPage = React.lazy(() => import("./Pages/SigninSignupPage"));
const UpdateProfilePage = React.lazy(() => import("./Pages/UpdateProfilePage"));


function App() {
  const currentUser = useSelector(selectCurrentUser);

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

          <Route exact path="/login" render={() => !currentUser ? <SigninSignupPage /> : <Redirect to="/" />} />

          <Route exact path="/" render={() => currentUser ? <HomePage /> : <Redirect to="/login" />} />
          <Route exact path="/pagination" render={() => currentUser ? <PaginationPage /> : <Redirect to="/login" />} />
          <Route exact path="/updateprofile" render={() => currentUser ? <UpdateProfilePage /> : <Redirect to="/login" />} />
          {/* <ProtectedRoute exact path="/">
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/pagination">
            <PaginationPage />
          </ProtectedRoute> */}


        </Switch>
      </React.Suspense>
    </>
  );
}

export default App;
