import React from 'react';
import { TwitterTimeline  } from 'react-twitter-embedded-timeline';
import { Link } from 'react-router';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="text-center">ComProDB</h1>
          <p className="text-center">The database needed by all competitive programmers.</p>
        </div>
        <div className="container-fluid">
          <blockquote>
            <h2>
              <a href="http://codeforces.com/">Codeforces</a> is a website dedicated to helping individuals passionate about expanding their programming abilities.
              This is done through online competitions between aspiring competitive programmers that allow them to sharpen their algorithmic knowledge.
            </h2>
          </blockquote>
          <blockquote>
            <h2>
              ComProDB hopes to enable these aspiring ICPC champions to more efficiently prepare themselves and analyze their performance
              through a clean interface to quickly find and compare data on Users, Contests, and Problems.
            </h2>
          </blockquote>
          <div className="page-header">
            <h2><Link to="/users" className="text-warning">Users</Link></h2>
          </div>
          <div className="panel-body">
            <h4>Users are the brilliant programmers challenging themselves with new problems and learning from the challenges.</h4>
          </div>
          <div className="page-header">
            <h2><Link to="/contests" className="text-danger">Contests</Link></h2>
          </div>
          <div className="panel-body">
            <h4>Contests are competitions given during specific time periods with a given set of problems.
              Contestants compete to be the first to solve all the problems correctly and efficiently.</h4>
          </div>
          <div className="page-header">
            <h2><Link to="/problems" className="text-success">Problems</Link></h2>
          </div>
          <div className="panel-body">
            <h4>Contestants compete to be the first to solve all the problems correctly and efficiently.</h4>
          </div>

          <div className="page-header">
            <h2>What People Are Saying</h2>
          </div>

          <div className="row text-center">
            <div className="col-md-6">
              <TwitterTimeline widgetId="712867561201917953" />
            </div>
            <div className="col-md-6">
              <TwitterTimeline widgetId="712847513963761664" />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
