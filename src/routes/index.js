import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Repository from '../pages/Repository';

// import { Container } from './styles';

export default function routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route exact path="/repository" component={Repository}></Route>
      </Switch>
    </BrowserRouter>
  );
}
