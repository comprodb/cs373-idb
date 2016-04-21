import React from 'react';
import { Link } from 'react-router';

export default class SearchResults extends React.Component {
  constructor() {
    super();
    this.highlight = this.highlight.bind(this);
  }

  highlight(text) {
    const { term } = this.props;

    const re = new RegExp(term, "gi");

    text = text.replace(
      re,
      `<span style="background-color: yellow;">${term}</span>`
    );

    const html = {
      __html: text,
    };

    return (<span dangerouslySetInnerHTML={html} />);
  }

  render() {
    return (
      <div>
        <h3>Users</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Handle</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.users.map((user) => (
              <tr>
                <td>
                  <Link to={`/users/${user.handle}`}>
                    {this.highlight(user.handle)}
                  </Link>
                </td>
                <td>{this.highlight(user.name)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Contests</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.contests.map((contest) => (
              <tr>
                <td>
                  <Link to={`/contests/${contest.id}`}>
                    {this.highlight(contest.name)}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Problems</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.problems.map((problem) => (
              <tr>
                <td>
                  <Link to={`/problems/${problem.contest_id}/${problem.index}`}>
                    {this.highlight(problem.name)}
                  </Link>
                </td>
                <td>{this.highlight(problem.tags.join(", "))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
