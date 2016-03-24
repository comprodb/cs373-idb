import React from 'react';
import { Link } from 'react-router';

import problems from '../data/problems';

export default class Problem extends React.Component {
  constructor(props) {
    super(props);

    const id = props.params.id;

    let problem;
    for (problem of problems) {
      if (problem.id == id) break;
    }

    this.state = {
      problem: problem,
    };
  }

  render() {
    const problem = this.state.problem;
    return (
      <div>
        <h1>{this.state.problem.name}</h1>
        <Link to={`/contests/${problem.contest_id}`}>Go to contest</Link>
        <h3>Tags <i className="fa fa-tags"></i></h3>
        {problem.tags.map((tag) => (
          <p className="label label-default" key={tag}>{tag}</p>
        ))}
      </div>
    );
  }
}
