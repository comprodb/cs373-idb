import React from 'react';

import users from '../data/users';

export default class User extends React.Component {
  constructor(props) {
    super(props);

    // Get the user id param and set the state to that user
    const id = props.params.id;
    this.state = {
      user: users[id],
    };
  }

  render() {
    return (
      <h1>{this.state.user.name}</h1>
    );
  }
}
