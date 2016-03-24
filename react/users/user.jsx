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
      <div className="row">
        <div className="col-md-4">
          <img src={`http://codeforces.com/userphoto/title/${user.handle}/photo.jpg`} />
        </div>
        <div className="col-md-8">
          <h1>{user.handle}</h1>
          <p>{user.name}</p>
          <p>User since {date}</p>
          <p>Rank: <span className="label label-primary">{user.rank}</span></p>
          <p>Rating: {user.rating}</p>
        </div>
      </div>
    );
  }
}
