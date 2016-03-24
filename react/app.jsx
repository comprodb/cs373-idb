import { Router, Route, Link, browserHistory } from 'react-router'
import React from 'react'
import { render } from 'react-dom'

import Home from './home/home';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
  </Router>
);

render(router, document.getElementById('content'));
