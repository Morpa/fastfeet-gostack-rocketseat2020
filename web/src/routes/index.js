import React from 'react';
import { Switch } from 'react-router-dom';

import Delivery from '../pages/Delivery';
import Deliverymen from '../pages/Deliverymen';
import Problems from '../pages/Problems';
import Recipients from '../pages/Recipients';
import SignIn from '../pages/SignIn';
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/deliveries" component={Delivery} isPrivate />
      <Route path="/deliverymen" component={Deliverymen} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
    </Switch>
  );
}
