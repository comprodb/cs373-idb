import React from 'react';
import { Link } from 'react-router';
import { loadSingular } from '../data/load-data';

export default class Problem extends React.Component {
  constructor() {
    super();
    this.state = {
      problem: null,
    };

    this.loadProblem = this.loadProblem.bind(this);
  }

  componentDidMount() {
    this.loadProblem();
  }

  loadProblem() {
    const params = this.props.params;
    loadSingular(`/api/problems/${params.contest_id}/${params.index}`)
      .then((data) => this.setState({ problem: data }));
  }

  render() {
    const problem = this.state.problem;

    if (!problem) {
      return <h1>Loading...</h1>;
    }

    const url =
      `http://codeforces.com/problemset/problem/${problem.contest_id}/${problem.index}`;

    return (
      <div>
        <h1>{this.state.problem.name}</h1>
        <Link to={`/contests/${problem.contest_id}`}>Go to contest</Link>
        <h3>Tags <i className="fa fa-tags"></i></h3>
        {problem.tags.map((tag) => (
          <p className="label label-default" key={tag}>{tag}</p>
        ))}
        <div style={{marginTop: 20}}>
          <a className="btn btn-default" href={url} role="button">
            Visit this problem on codeforces
          </a>
        </div>
      </div>
    );
  }
}
