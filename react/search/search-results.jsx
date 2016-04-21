import React from 'react';

export default class SearchResults extends React.Component {
  constructor() {
    super();
    this.highlight = this.highlight.bind(this);
  }

  highlight(text) {
    const { term } = this.props;

    const re = new RegExp(term, "g");

    text = text.replace(re, `<span style="background-color: yellow;">${term}</span>`);

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
                <td>{this.highlight(user.handle)}</td>
                <td>{this.highlight(user.name)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Contests</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Handle</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.contests.map((contest) => (
              <tr>
                <td>{highlight(contest.handle)}</td>
                <td>{highlight(contest.name)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Problems</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Handle</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.problems.map((problem) => (
              <tr>
                <td>{highlight(problem.handle)}</td>
                <td>{highlight(problem.name)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
