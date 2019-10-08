import React from 'react'
import { Route } from 'react-router-dom'
import Types from 'prop-types'

const Router = props => {
  const { routes, children } = props

  return (
    <>
      {children}
      {Object.keys(routes).map((route, index) => {
        const params = routes[route];

        return (
          <Route
            key={index}
            path={route}
            exact={params.exact || false}
            component={params.component}
          />
        )
      })}
    </>
  )
};

Router.propTypes = {
  routes: Types.array.isRequired,
  children: Types.array,
};

Router.defaultProps = {
  children: [],
};

export default Router
