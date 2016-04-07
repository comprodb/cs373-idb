import React from 'react';
import moment from 'moment';

export default class User extends React.Component {
  constructor(props) {
    super(props);

    const id = props.params.id;

    this.state = {
      user: null,
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
