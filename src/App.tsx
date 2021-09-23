import { FunctionComponent, useState } from "react";
import { HashRouter, Switch, Route, useHistory, Redirect } from "react-router-dom";
import Properties from "./pages/property/properties";
import PropertyDetail from "./pages/property/property-detail";

import HeaderNavigation from "./components/template/navigation";
import "./assets/css/general.css";

import Login from "./components/auth/login";
import Logout from './components/auth/logout';
import Register from "./components/auth/register";
import Profile from "./components/auth/profile";
import NotFound from "./pages/page-not-found";

import jwt_decode from "jwt-decode";
import UserService from "./services/user-service";

const App: FunctionComponent = () => {
  const history = useHistory();

  const [token, setToken] = useState<string>(localStorage.token)

  const updateToken = (token: string) => {
    setToken(token);
  }
  const role = UserService.authorized();

  if (role !== 0) {
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
    <HashRouter>
      <HeaderNavigation token={token} />
      <Switch>
        {role !== 0 &&
          <>
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/logout">
              <Logout updateToken={updateToken} />
            </Route>

            <Route exact path="/properties" component={Properties} />
            <Route path="/property/:idProperty" component={PropertyDetail} />
          </>
        }
        <Route exact path={["/", "/login"]}>
          <Login updateToken={updateToken} />
        </Route>
        <Redirect to='/login' />
        <Route path="*" component={NotFound} />
      </Switch>
    </HashRouter>
  );
};

export default App;
