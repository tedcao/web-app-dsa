import React from "react";
import ReactDOM from "react-dom";
import MyEnhancedForm from "./views/submitform/form";
import Listing from "./views/listing/listing";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  {
    path: "/submitform",
    component: MyEnhancedForm
  },
  {
    path: "/formlist/:email",
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
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>
              WEB-APP-DSA <span className="badge badge-primary">New</span>
            </h1>
          </div>
        </div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  <Link className="navbar-brand mb-0 h1" to="/submitform">
                    Student Submit From
                  </Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <Link className="navbar-brand mb-0 h1" to="/formlist">
                    List of the submissions
                  </Link>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="Container">
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </div>
      </div>
    </Router>
  );
}

ReactDOM.render(<RouteConfigExample />, document.getElementById("root"));
