import React from 'react';
import { Link } from 'react-router';

import abouts from '../data/abouts';
import statistics from '../data/statistics';

export default class About extends React.Component {
  constructor() {
    super();
    this.state = {
      abouts: abouts,
      statistics: statistics,
    };
  }

  render() {
    const { abouts, statistics } = this.state;

    return (
      <div className="col-md-8 col-md-offset-2">
        <h1 className="text-center">About Us</h1>
        {abouts.map((about) => (
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
        <h1 className="text-center">Statistics</h1>
        <div className="panel panel-default" key="STATISTICS">
          <div className="row panel-body">
            <div className="col-md-6">
              <h3>Commits</h3>
              <p>{statistics.commits}</p>
              <h3>Issues</h3>
              <p>{statistics.issues}</p>
              <h3>Tests</h3>
              <p>{statistics.tests}</p>
              <h3>Apiary</h3>
              <p><a href={statistics.apiary}>{statistics.apiary}</a></p>
              <h3>Github Issues</h3>
              <p><a href={statistics.tracker}>{statistics.tracker}</a></p>
              <h3>Github Repo</h3>
              <p><a href={statistics.repo}>{statistics.repo}</a></p>
              <h3>Github Wiki</h3>
              <p><a href={statistics.wiki}>{statistics.wiki}</a></p>
            </div>
            <div className="col-md-6">
              <h3>Data Sources</h3>
              <p><a href="http://www.codeforces.com/api/help">www.codeforces.com/api/help</a></p>
              <h3>Obtaining Data</h3>
              <p>{statistics.data_source_description}</p>
              <h3>Tools</h3>
              <ul>
                <li>ReactJS</li>
                <li>Flask</li>
                <li>Postgresql</li>
                <li>NPM</li>
                <li>Bootstrap</li>
                <li>yUML</li>
                <li>Pydoc</li>
                <li>Apiary</li>
                <li>Slack</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
