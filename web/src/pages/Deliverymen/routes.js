import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

import Form from './components/Form';
import List from './components/List';

export default function Router({ path }) {
  return (
    <Switch>
      <Route path={`${path}/list`} component={List} />
      <Route path={`${path}/add`} component={Form} />
      <Route path={`${path}/edit/:id`} component={Form} />

      <Route path={`${path}*`}>
        <Redirect to={`${path}/list`} />
      </Route>
    </Switch>
  );
}

Router.propTypes = {
  path: PropTypes.string.isRequired,
};
