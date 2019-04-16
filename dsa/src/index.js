import React from "react";
import ReactDOM from "react-dom";
import SubmitForm from "./views/submitform/form";
import Listing from "./views/listing/listing";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  {
    path: "/submitform",
    component: SubmitForm
  },
  {
    path: "/formlist",
    component: Listing
  }
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function RouteConfigExample() {
  return (
    <Router>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1>
              WEB-APP-DSA <span class="badge badge-primary">New</span>
            </h1>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <nav class="navbar navbar-light bg-light">
              <Link class="navbar-brand mb-0 h1" to="/submitform">
                Student Submit From
              </Link>
            </nav>
            <nav class="navbar navbar-light bg-light">
              <Link class="navbar-brand mb-0 h1" to="/formlist">
                List Of the form
              </Link>
            </nav>
          </div>
          <div class="col-9">
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </div>
        </div>
      </div>
    </Router>
  );
}

ReactDOM.render(<RouteConfigExample />, document.getElementById("root"));
