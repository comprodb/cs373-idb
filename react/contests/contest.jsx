import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { loadSingular } from '../data/load-data';

export default class Contest extends React.Component {
  constructor() {
    super();
    this.state = {
      contest: null,
    };

    this.loadContest = this.loadContest.bind(this);
  }

  componentDidMount() {
    this.loadContest();
  }

  loadContest() {
    loadSingular(`/api/contests/${this.props.params.id}`)
      .then((data) => this.setState({ contest: data }));
  }

  render() {
    const contest = this.state.contest;

    if (!contest) {
      return (
        <h1>Loading...</h1>
      );
    }

    const date = moment.unix(contest.date).format("MMM Do YYYY");
    const url = `http://codeforces.com/contest/${contest.id}`;

    return (
      <div>
        <h1>{contest.name}</h1>
        <p>Posted {date}</p>
        <h3>Problems</h3>
        <div className="list-group">
          {contest.contest_problems.map((problem) => (
            <Link
              to={`/problems/${problem.id}`}
              className="list-group-item"
              key={problem.id}>
              {problem.name}
            </Link>
          ))}
        </div>
        <a className="btn btn-default" href={url} role="button">
          Visit this contest on codeforces
        </a>
      </div>
    );
  }
}
