import Home from "pages/Home";
import Services from "pages/Services";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";

const AppRoutes = () => {
  return (
    <div>
      <ul role="nav" className="app-navigation-link">
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/services">Services</NavLink>
        </li>
      </ul>

      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/services" component={Services} />
        <Redirect from="/" to="/services" />
      </Switch>
    </div>
  );
};

export default AppRoutes;
