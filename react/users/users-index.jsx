import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import users from '../data/users';

export default class UsersIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      users: users,
      sorted_by: null,
    };

    this.sortBy = this.sortBy.bind(this);
  }

  sortBy(field) {
    let users = this.state.users;
    if (field === this.state.sorted_by) {
      users.reverse();
    } else {
      users.sort((a, b) => {
        if (a[field] < b[field]) return -1;
        if (a[field] > b[field]) return 1;
        return 0;
      });
    }

    this.setState({
      users: users,
      sorted_by: field,
    });
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th><a href="#" onClick={() => this.sortBy('handle')}>Handle</a></th>
              <th><a href="#" onClick={() => this.sortBy('name')}>Name</a></th>
              <th><a href="#" onClick={() => this.sortBy('rank')}>Rank</a></th>
              <th><a href="#" onClick={() => this.sortBy('rating')}>Rating</a></th>
              <th><a href="#" onClick={() => this.sortBy('registration_time')}>Registration Date</a></th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => {
              const date = moment.unix(user.registration_time).format("MMM Do YYYY");
              return (
                <tr key={user.handle}>
                  <td><Link to={`/users/${user.handle}`}>{user.handle}</Link></td>
                  <td>{user.name}</td>
                  <td>{user.rank}</td>
                  <td>{user.rating}</td>
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
