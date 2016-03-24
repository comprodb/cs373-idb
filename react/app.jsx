import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import React from 'react'
import { render } from 'react-dom'

import Navbar from './nav-bar';
import Home from './home/home';

import About from './about/about';
import AboutIndex from './about/about-index';

import Users from './users/users';
import UsersIndex from './users/users-index';
import User from './users/user';

import Problems from './problems/problems';
import ProblemsIndex from './problems/problems-index';
import Problem from './problems/problem';

import Contests from './contests/contests';
import ContestsIndex from './contests/contests-index';
import Contest from './contests/contest';

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
      <Route path="about" component={About}>
        <IndexRoute component={AboutIndex} />
      </Route>
      <Route path="users" component={Users}>
        <IndexRoute component={UsersIndex} />
        <Route path=":id" component={User} />
      </Route>
      <Route path="problems" component={Problems}>
        <IndexRoute component={ProblemsIndex} />
        <Route path=":id" component={Problem} />
      </Route>
      <Route path="contests" component={Contests}>
        <IndexRoute component={ContestsIndex} />
        <Route path=":id" component={Contest} />
      </Route>
    </Route>
  </Router>
);

render(router, document.getElementById('content'));
