import React from 'react';
import moment from 'moment';

import users from '../data/users';

export default class User extends React.Component {
  constructor(props) {
    super(props);

    const id = props.params.id;

    let user;
    for (user of users) {
      if (user.handle === id) break;
    }

    this.state = {
      user: user,
    };
  }

  render() {
    const user = this.state.user;

    const date = moment.unix(user.registration_time).format("MMM Do YYYY");

    return (
      <div>
        <h1>{user.name}</h1>
        <p>User since {date}</p>
        <table className="table">
          <thead>
            <tr>
              <th>Handle</th>
              <th>Rank</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.handle}</td>
              <td>{user.rank}</td>
              <td>{user.rating}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
