import React from 'react';

import users from '../data/users';

export default class User extends React.Component {
  constructor(props) {
    super(props);

    // Get the user id param and set the state to that user
    const user_id = props.params.id;
    this.state = {
      user: users[user_id],
    };
  }

  render() {
    return (
      <h1>{this.state.user.name}</h1>
    );
  }
}
