import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./Pages/HomePage";
import PaginationPage from "./Pages/PaginationPage";
import SigninSignupPage from "./Pages/SigninSignupPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
function App() {

  return (
    <>
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
    </>
  );
}

export default App;
