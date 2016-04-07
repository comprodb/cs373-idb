import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { loadList } from '../data/load-data';
import Th from '../shared/th';

export default class UsersIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      page: 1,
      sorted_by: null,
      reverse: false,
    };

    this.loadUsers = this.loadUsers.bind(this);
    this.sortBy = this.sortBy.bind(this);

    this.loadUsers();
  }

  loadUsers() {
    loadList('/api/users', this.state.sorted_by, this.state.reverse)
      .then((data) => this.setState({ users: data }));
  }

  sortBy(field) {
    let reverse = false;
    if (field === this.state.sorted_by) {
      reverse = !this.state.reverse;
    }

    this.setState({
      sorted_by: field,
      reverse: reverse,
    }, this.loadUsers);
  }

  render() {
    const fields = [
      {
        name: 'handle',
        title: 'Handle',
      },
      {
        name: 'name',
        title: 'Name',
      },
      {
        name: 'rank',
        title: 'Rank',
      },
      {
        name: 'rating',
        title: 'Rating',
      },
      {
        name: 'registration_time',
        title: 'Registration Date',
      },
    ];

    return (
      <div>
        <h1>Users</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              {fields.map((field) => (
                <Th
                  title={field.title}
                  sorted={field.name === this.state.sorted_by}
                  reverse={this.state.reverse}
                  onClick={() => this.sortBy(field.name)} />
              ))}
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
