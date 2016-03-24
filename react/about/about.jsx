import React from 'react';
import { Link } from 'react-router';

import abouts from '../data/abouts';

export default class About extends React.Component {
  constructor() {
    super();
    this.state = {
      abouts: abouts,
    };
  }

  render() {
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1 className="text-center">About Us</h1>
        {this.state.abouts.map((about) => (
          <div className="panel panel-default" key={about.name}>
            <div className="panel-heading">
              <h2>{about.name}</h2>
            </div>
            <div className="row panel-body">
              <div className="col-md-6">
                <img src={about.photo} className="img-responsive" />
              </div>
              <div className="col-md-6">
                <h3>Bio</h3>
                <p>{about.bio}</p>
                <h3>Responsibilities</h3>
                <p>{about.responsibilities}</p>
                <h3>Commits</h3>
                <p>{about.commits}</p>
                <h3>Issues</h3>
                <p>{about.issues}</p>
                <h3>Tests</h3>
                <p>{about.tests}</p>
              </div>
            </div>
          </div>
          ))}
        </div>
    );
  }
}
