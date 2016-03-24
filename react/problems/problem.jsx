import React from 'react';

import problems from '../data/problems';

export default class Problem extends React.Component {
  constructor(props) {
    super(props);

    const id = props.params.id;

    let problem;
    for (problem of problems) {
      if (problem.id === id) break;
    }

    this.state = {
      problem: problem,
    };
  }

  render() {
    return (
      <h1>{this.state.problem.name}</h1>
    );
  }
}
