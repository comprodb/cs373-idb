import React from 'react';
import SearchResults from './search-results';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    const { query } = props.location.query;

    this.state = {
      data: null,
    };

    fetch(`/api/search/?query=${query}`).then((response) => {
      if (response.status >= 400) {
        reject("Bad response from server");
      }
      return response.json();
    }).then(({ data }) => {
      this.setState({data: data});
    });
  }

  render() {
    const { query } = this.props.location.query;
    const data = this.state.data;

    if (!data) {
      return (<h1>Loading...</h1>);
    }

    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Search Results</h1>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>All results</h2>
          </div>
          <div className="panel-body">
            <SearchResults data={data.all} term={query} />
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h2>Similar results</h2>
          </div>
          <div className="panel-body">
            <SearchResults data={data.some} term={query} />
          </div>
        </div>
      </div>
    );
  }
}
