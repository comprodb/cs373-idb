import React from 'react';
import moment from 'moment';
import { loadSingular } from '../data/load-data';

export default class User extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };

    this.loadUser = this.loadUser.bind(this);
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser() {
    loadSingular(`/api/users/${this.props.params.id}`)
      .then((data) => this.setState({ user: data }));
  }

  render() {
    const user = this.state.user;

    if (!user) {
      return <h1>Loading...</h1>;
    }

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
