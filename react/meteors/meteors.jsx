import React from 'react';
import { Link } from 'react-router';
import { loadList } from '../data/load-data';
import Th from '../shared/th';

export default class Meteors extends React.Component {
  constructor() {
    super();
    this.state = {
        index : 0,
        meteors : [],
    };

    this.loadUsers = this.loadMeteors.bind(this);
    this.tick = this.tick.bind(this);

    this.loadMeteors();
  }

  loadMeteors () {

    fetch("/api/meteors").then((response) => {
      return response.json();
    }).then ( ( {data}) =>{
      data.objects.sort ( ( a,b ) => {
        return a.year - b.year;
      } );
      this.setState( { meteors : data.objects } );
      this.timer = setInterval(this.tick, 1000);
    });
  }

  tick () {

    this.setState({index: this.state.index + 1});

  }

  render() {
    return (
      <div>
        <h1>Meteors</h1>
        <table className="table table-striped">
          <tbody>
            <tr >
              <td >
                {this.state.meteors.length > 0 ? this.state.meteors[this.state.index].name : ''}
              </td >
              <td >
                {this.state.meteors.length > 0 ? this.state.meteors[this.state.index].country.name : ''}
              </td >
              <td >
                {this.state.meteors.length > 0 ? this.state.meteors[this.state.index].year : ''}
              </td >
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
