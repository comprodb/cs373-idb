import React from 'react';
import { Link } from 'react-router';
import { loadList } from '../data/load-data';
import Th from '../shared/th';

export default class ProblemIndex extends React.Component {
  constructor() {
    super();

    this.state = {
      problems: [],
      page: 1,
      sorted_by: null,
      reverse: false,
    };

    this.sortBy = this.sortBy.bind(this);
    this.loadProblems = this.loadProblems.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);

    this.loadProblems();
  }

  loadProblems() {
    loadList('/api/problems/', this.state.sorted_by, this.state.reverse, this.state.page)
      .then((data) => this.setState({ problems: data }));
  }

  sortBy(field) {
    let reverse = false;
    if (field === this.state.sorted_by) {
      reverse = !this.state.reverse;
    }

    this.setState({
      sorted_by: field,
      reverse: reverse,
    }, this.loadProblems);
  }

  nextPage(e) {
    e.preventDefault();
    this.setState({
      page: this.state.page + 1,
    }, this.loadProblems);
  }

  prevPage(e) {
    e.preventDefault();
    this.setState({
      page: this.state.page - 1,
    }, this.loadProblems);
  }

  render() {
    const fields = [
      {
        name: 'name',
        title: 'Name',
      },
      {
        name: 'contest_id',
        title: 'Contest ID',
      },
      {
        name: 'index',
        title: 'index',
      },
      {
        name: 'points',
        title: 'Points',
      },
    ];

    return (
      <div>
        <h1>Problems</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              {fields.map((field) => (
                <Th
                  title={field.title}
                  sorted={field.name === this.state.sorted_by}
                  reverse={this.state.reverse}
                  onClick={() => this.sortBy(field.name)} />
              ))}
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {this.state.problems.map((problem) => (
              <tr key={problem.id}>
                <td><Link to={`/problems/${problem.id}`}>{problem.name}</Link></td>
                <td><Link to={`/contests/${problem.contest_id}`}>{problem.contest_id}</Link></td>
                <td>{problem.index}</td>
                <td>{problem.points}</td>
                <td>
                  {problem.tags.map((tag) => (
                    <p className="label label-default" key={tag}>{tag}</p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <ul className="pager">
            <li className={this.state.page > 1 ? "previous" : "previous disabled"}>
              <a href="#" onClick={this.prevPage}>
                <span aria-hidden="true">&larr;</span> Previous
              </a>
            </li>
            <li className="next">
              <a href="#" onClick={this.nextPage}>
                Next <span aria-hidden="true">&rarr;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
