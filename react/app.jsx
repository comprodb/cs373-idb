import 'babel-polyfill';
import 'isomorphic-fetch';

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import React from 'react'
import { render } from 'react-dom'

import Navbar from './nav-bar';
import Page from './page';
import Home from './home/home';

import UsersIndex from './users/users-index';
import User from './users/user';

import ProblemsIndex from './problems/problems-index';
import Problem from './problems/problem';

import ContestsIndex from './contests/contests-index';
import Contest from './contests/contest';

import About from './about/about';

import Search from './search/search';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="users" component={Page}>
        <IndexRoute component={UsersIndex} />
        <Route path=":id" component={User} />
      </Route>
      <Route path="problems" component={Page}>
        <IndexRoute component={ProblemsIndex} />
        <Route path=":contest_id/:index" component={Problem} />
      </Route>
      <Route path="contests" component={Page}>
        <IndexRoute component={ContestsIndex} />
        <Route path=":id" component={Contest} />
      </Route>
      <Route path="about" component={About} />
      <Route path="search" component={Search} />
    </Route>
  </Router>
);

render(router, document.getElementById('content'));
