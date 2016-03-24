import React from 'react';
import { Link } from 'react-router';

import contests from '../data/contests';

export default class ContestsIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      contests: contests,
    };
  }

  render() {
    return (
      <div>
        <h1>Contests</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID #</th>
              <th># Participants</th>
              <th># Problems</th>
              <th>Name</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contests.map((contest) => (
              <tr key={contest.id}>
                <td>{contest.id}</td>
                <td>{contest.participants}</td>
                <td>{contest.problems}</td>
                <td><Link to={`problems/${contest.id}`}>{contest.name}</Link></td>
                <td>{new Date(1000 * contest.date).getFullYear()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
