import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import contests from '../data/contests';
import problems from '../data/problems';

export default class Contest extends React.Component {
  constructor(props) {
    super(props);

    const id = props.params.id;

    let contest;
    for (contest of contests) {
      if (contest.id == id) break;
    }

    this.state = {
      contest: contest,
    };
  }

  render() {
    const contest = this.state.contest;

    const contest_problems = problems.filter((problem) => {
      return problem.contest_id === contest.id
    });

    const date = moment.unix(contest.date).format("MMM Do YYYY");

    return (
      <div>
        <h1>{contest.name}</h1>
        <p>Posted {date}</p>
        <h3>Problems</h3>
        <div className="list-group col-md-4">
          {contest_problems.map((problem) => (
            <Link
              to={`/problems/${problem.id}`}
              className="list-group-item"
              key={problem.id}>
              {problem.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
