import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import contests from '../data/contests';

export default class ContestsIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      contests: contests,
    };

    this.sortBy = this.sortBy.bind(this);
  }

  sortBy(field) {
    let contests = this.state.contests;
    if (field === this.state.sorted_by) {
      contests.reverse();
    } else {
      contests.sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      });
    }

    this.setState({
      contests: contests,
      sorted_by: field,
    });
  }

  render() {
    return (
      <div>
        <h1>Contests</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th><a href="#" onClick={() => this.sortBy('id')}>ID #</a></th>
              <th><a href="#" onClick={() => this.sortBy('participants')}># Participants</a></th>
              <th><a href="#" onClick={() => this.sortBy('problems')}># Problems</a></th>
              <th><a href="#" onClick={() => this.sortBy('id')}>Name</a></th>
              <th><a href="#" onClick={() => this.sortBy('date')}>Date</a></th>
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
