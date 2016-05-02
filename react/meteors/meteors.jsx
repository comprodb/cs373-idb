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
    }).then (({data}) =>{
      data.objects.sort ( ( a,b ) => {
        return a.year - b.year;
      } );
      this.setState({ meteors : data.objects });
      this.timer = setInterval(this.tick, 1000);
    });
  }

  tick () {
    this.setState({index: this.state.index + 1});
  }

  render() {
    const { meteors, index } = this.state;
    let name, country, year;
    if (meteors.length > 0) {
      name =  meteors[index].name;
      country = meteors[index].country.name;
      year = meteors[index].year;
    }

    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Meteors</h1>
        <h3>Name: {name}</h3>
        <p>Country: {country}</p>
        <p>Year: {year}</p>
      </div>
    );
  }
}
