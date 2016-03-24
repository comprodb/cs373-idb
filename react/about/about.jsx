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
      <div>
        <h1>Abouts</h1>
            {this.state.abouts.map((about) => (
          <div>
				<table className="table">
                <td>
				<table className="table">
					<thead>
					<td>{about.name}</td>
					</thead>
					<tr>
					<td><img src={about.photo} className="img-responsive" width="400" height="400"/></td>
					</tr>
				</table>
                </td>




              <td>
				<table className="table table-striped table-hover">
                <tr><td>Bio</td><td>{about.bio}</td></tr>
                <tr><td>Responsibilities</td><td>{about.responsibilities}</td></tr>
                <tr><td>Commits</td><td>{about.commits}</td></tr>
                <tr><td>Issues</td><td>{about.issues}</td></tr>
                <tr><td>Tests</td><td>{about.tests}</td></tr>
				</table>
              </td>
				</table>
          </div>
            ))}
      </div>
    );
  }
}
