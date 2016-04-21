import React from 'react';
import { IndexLink } from 'react-router'

export default class NavBar extends React.Component {
  render() {
    const { query } = this.props;

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <IndexLink to="/" className="navbar-brand">ComProDB</IndexLink>
          </div>

          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav">
              <li><IndexLink to="/users" activeClassName="active">Users</IndexLink></li>
              <li><IndexLink to="/problems" activeClassName="active">Problems</IndexLink></li>
              <li><IndexLink to="/contests" activeClassName="active">Contests</IndexLink></li>
              <li><IndexLink to="/about" activeClassName="active">About</IndexLink></li>
            </ul>
            <form action="/search" method="get" className="navbar-form navbar-right" role="search" >
              <div className="form-group">
                <input
                  name="query"
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  defaultValue={query} />
              </div>
              <button type="submit" className="btn btn-default">Go</button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}
