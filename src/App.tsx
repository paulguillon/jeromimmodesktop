import { FunctionComponent, useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import Properties from "./pages/property/properties";
import PropertyDetail from "./pages/property/property-detail";

import HeaderNavigation from "./components/template/navigation";
import FooterNavigation from "./components/template/footer";
import "./assets/css/general.css";

import Login from "./components/auth/login";
import Logout from './components/auth/logout';
import Register from "./components/auth/register";
import Profile from "./components/auth/profile";
import NotFound from "./pages/page-not-found";

import jwt_decode from "jwt-decode";

const App: FunctionComponent = () => {
  const history = useHistory();

  if (!localStorage.token)
    history.push('/login');

  const [token, setToken] = useState<string>(localStorage.token)

  const updateToken = (token: string) => {
    setToken(token);
  }

  if (token) {
    const UserInfo: any = jwt_decode(token);

    //deconnexion automatique après 24 heures
    let currentTime = new Date().getTime();
    let timeSinceLoggedIn = (currentTime - new Date(UserInfo.iat * 1000).getTime()) / 1000 / 3600;
    if (timeSinceLoggedIn > 24) {
      setToken("");
      history.push("/logout");
    }
  }

  return (
    <Router>
      <HeaderNavigation token={token} />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/login">
          <Login updateToken={updateToken} />
        </Route>
        <Route exact path="/logout">
          <Logout updateToken={updateToken} />
        </Route>

        <Route exact path="/condition-general" />
        <Route exact path="/mentions-legales" />

        <Route exact path="/properties" component={Properties} />
        <Route path="/property/:idProperty" component={PropertyDetail} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <FooterNavigation />
    </Router>
  );
};

export default App;
