import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { loadList } from '../data/load-data';

export default class ContestsIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      contests: [],
      page: 1,
      sorted_by: null,
      reverse: false,
    };

    this.loadContests = this.loadContests.bind(this);
    this.sortBy = this.sortBy.bind(this);

    this.loadContests();
  }

  loadContests() {
    loadList('/api/contests', this.state.sorted_by, this.state.reverse)
      .then((data) => this.setState({ contests: data }));
  }

  sortBy(field) {
    let reverse = false;
    if (field === this.state.sorted_by) {
      reverse = !this.state.reverse;
    }

    this.setState({
      sorted_by: field,
      reverse: reverse,
    }, this.loadContests);
  }

  render() {
    const fields = ['id', 'participants', 'problems', 'name', 'date'];

    return (
      <div>
        <h1>Contests</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              {fields.map((field) => {
                let arrow;
                if (field === this.state.sorted_by) {
                  arrow = this.state.reverse ? '↓' : '↑';
                }

                return (
                  <th key={field}>
                    <a href="#" onClick={() => this.sortBy(field)}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </a>
                    {" "}{arrow}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {this.state.contests.map((contest) => {
              const date = moment.unix(contest.date).format("MMM Do YYYY");
              return (
                <tr key={contest.id}>
                  <td>{contest.id}</td>
                  <td>{contest.participants}</td>
                  <td>{contest.problems}</td>
                  <td><Link to={`/contests/${contest.id}`}>{contest.name}</Link></td>
                  <td>{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
