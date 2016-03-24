import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';

import users from '../data/users';

export default class UsersIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      users: users,
    };
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Handle</th>
              <th>Name</th>
              <th>Rank</th>
              <th>Rating</th>
              <th>Registration Date</th>
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
