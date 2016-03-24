import React from 'react';
import { Link } from 'react-router';

import abouts from '../data/abouts';

export default class AboutIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      abouts: abouts,
    };
  }

  render() {
    return (
      <div>
        <h1>Abouts</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Photo</th>
              <th>Bio</th>
              <th>Responsibilities</th>
              <th>Commits</th>
              <th>Issues</th>
              <th>Tests</th>
            </tr>
          </thead>
          <tbody>
            {this.state.abouts.map((about) => (
              <tr key={about.name}>
                <td>{about.name}</td>
                <td>{about.photo}</td>
                <td>{about.bio}</td>
                <td>{about.responsibilities}</td>
                <td>{about.commits}</td>
                <td>{about.issues}</td>
                <td>{about.tests}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
