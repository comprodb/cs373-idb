import React from 'react';

import problems from '../data/problems';

export default class Problem extends React.Component {
  constructor(props) {
    super(props);

    const id = props.params.id;
    this.state = {
      problem: problems[id],
    };
  }

  render() {
    return (
      <h1>{this.state.problem.name}</h1>
    );
  }
}
