import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import { loadList } from '../data/load-data';
import Th from '../shared/th';

export default class ContestsIndex extends React.Component {
  constructor() {
    super();
    this.state = {
      contests: [],
      page: 1,
      sorted_by: null,
      reverse: false,
    };

    this.loadContests = this.loadContests.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);

    this.loadContests();
  }

  loadContests() {
    loadList('/api/contests', this.state.sorted_by, this.state.reverse, this.state.page)
      .then((data) => this.setState({ contests: data }));
  }

  sortBy(field) {
    let reverse = false;
    if (field === this.state.sorted_by) {
      reverse = !this.state.reverse;
    }

    this.setState({
      sorted_by: field,
      reverse: reverse,
    }, this.loadContests);
  }

  nextPage(e) {
    e.preventDefault();
    this.setState({
      page: this.state.page + 1,
    }, this.loadContests);
  }

  prevPage(e) {
    e.preventDefault();
    this.setState({
      page: this.state.page - 1,
    }, this.loadContests);
  }

  render() {
    const fields = [
      {
        name: 'id',
        title: 'ID #',
      },
      {
        name: 'participants',
        title: '# Participants',
      },
      {
        name: 'problems',
        title: '# Problems',
      },
      {
        name: 'name',
        title: 'Name',
      },
      {
        name: 'date',
        title: 'Date',
      },
    ];

    return (
      <div>
        <h1>Contests</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              {fields.map((field) => (
                <Th
                  key={field.name}
                  title={field.title}
                  sorted={field.name === this.state.sorted_by}
                  reverse={this.state.reverse}
                  onClick={() => this.sortBy(field.name)} />
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.contests.map((contest) => {
              const date = moment.unix(contest.date).format("MMM Do YYYY");
              return (
                <tr key={contest.id}>
                  <td>{contest.id}</td>
                  <td>{contest.participants}</td>
                  <td>{contest.problems}</td>
                  <td><Link to={`/contests/${contest.id}`}>{contest.name}</Link></td>
                  <td>{date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav>
          <ul className="pager">
            <li className={this.state.page > 1 ? "previous" : "previous disabled"}>
              <a href="#" onClick={this.prevPage}>
                <span aria-hidden="true">&larr;</span> Older
              </a>
            </li>
            <li className="next">
              <a href="#" onClick={this.nextPage}>
                Newer <span aria-hidden="true">&rarr;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
