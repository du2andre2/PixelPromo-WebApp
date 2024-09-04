import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import Promotion from './Promotion';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route path="/promotion/:id" component={Promotion} />
    </Switch>
  </Router>
);

export default Routes;
