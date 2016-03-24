import React from 'react';

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
    return (
      <h1>{this.state.user.name}</h1>
    );
  }
}
