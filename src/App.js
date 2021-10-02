import { Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./Pages/HomePage";
import PaginationPage from "./Pages/PaginationPage";
function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/pagination">
          <PaginationPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
