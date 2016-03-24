import React from 'react';
import { Link } from 'react-router';

import problems from '../data/problems';

export default class ProblemIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      problems: problems
    };
  }

  render() {
    return (
      <div>
        <h1>Problems</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contest ID</th>
              <th>Index</th>
              <th>Tags</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {this.state.problems.map((problem) => (
              <tr key={problem.id}>
                <td><Link to={`/problems/${problem.id}`}>{problem.name}</Link></td>
                <td><Link to={`/contests/${problem.contest_id}`}>{problem.contest_id}</Link></td>
                <td>{problem.index}</td>
                <td>{JSON.stringify(problem.tags)}</td>
                <td>{problem.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
