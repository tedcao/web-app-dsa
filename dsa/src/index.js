import React from "react";
import ReactDOM from "react-dom";
import MyEnhancedForm from "./views/submitform/form";
import StudentDataUpload from "./views/studentDataUpload/studentDataUpload";
import InsturctorListing from "./views/listing/insturctorlisting";
import SupervisorListing from "./views/listing/supervisorlisting";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

////////////////////////////////////////////////////////////
// then our route config
const routes = [
  {
    path: "/submitform",
    component: MyEnhancedForm
  },
  {
    path: "/uploadStudentData",
    component: StudentDataUpload
  },
  {
    path: "/instructor/:insturctor_email&:encryptcode",
    component: InsturctorListing
  },
  {
    path: "/supervisor/:supervisor_email&:encryptcode",
    component: SupervisorListing
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
            <h1>WEB-APP-DSA</h1>
          </div>
        </div>

        <div className="container">
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </div>
      </div>
    </Router>
  );
}

ReactDOM.render(<RouteConfigExample />, document.getElementById("root"));
