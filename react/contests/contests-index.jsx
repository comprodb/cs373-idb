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
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contests.map((contest) => (
              <tr key={contest.id}>
                <td><Link to={`problems/${contest.id}`}>{contest.name}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
