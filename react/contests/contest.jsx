import React from 'react';

import contests from '../data/contests';

export default class Contest extends React.Component {
  constructor(props) {
    super(props);

    const id = props.params.id;

    let contest;
    for (contest of contests) {
      if (contest.id === id) break;
    }

    this.state = {
      contest: contest,
    };
  }

  render() {
    return (
      <h1>{this.state.contest.name}</h1>
    );
  }
}
