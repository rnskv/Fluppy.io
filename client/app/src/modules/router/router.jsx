import React from "react";
import { Route } from "react-router-dom";
import Types from "prop-types";

const Router = props => {
  const { routes, children } = props;

  return (
    <>
      {children}
      {Object.keys(routes).map((route, index) => {
        const params = routes[route];

        return (
          <Route
            exact={params.exact || false}
            key={index}
            path={route}
            component={params.component}
          >
            {
              params.routes ?
                <Router routes={params.routes} />
                : null
            }
          </Route>
        );
      })}
    </>
  );
};

Router.propTypes = {
  routes: Types.array.isRequired,
  children: Types.array
};

Router.defaultProps = {
  children: []
};

export default Router;
