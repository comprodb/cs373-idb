import React from 'react';
import { Link } from 'react-router';

import problems from '../data/problems';

export default class ProblemIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      problems: problems,
      sorted_by: null,
    };

    this.sortBy = this.sortBy.bind(this);
  }

  sortBy(field) {
    let problems = this.state.problems;
    if (field === this.state.sorted_by) {
      problems.reverse();
    } else {
      problems.sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      });
    }

    this.setState({
      problems: problems,
      sorted_by: field,
    });
  }

  render() {
    return (
      <div>
        <h1>Problems</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th><a href="#" onClick={() => this.sortBy('name')}>Name</a></th>
              <th><a href="#" onClick={() => this.sortBy('contest_id')}>Contest ID</a></th>
              <th><a href="#" onClick={() => this.sortBy('index')}>Index</a></th>
              <th>Tags</th>
              <th><a href="#" onClick={() => this.sortBy('points')}>Points</a></th>
            </tr>
          </thead>
          <tbody>
            {this.state.problems.map((problem) => (
              <tr key={problem.id}>
                <td><Link to={`/problems/${problem.id}`}>{problem.name}</Link></td>
                <td><Link to={`/contests/${problem.contest_id}`}>{problem.contest_id}</Link></td>
                <td>{problem.index}</td>
                <td>
                  {problem.tags.map((tag) => (
                    <p className="label label-default" key={tag}>{tag}</p>
                  ))}
                </td>
                <td>{problem.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
