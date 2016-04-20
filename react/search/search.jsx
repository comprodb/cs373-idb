import React from 'react';

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
      <h1>Search</h1>
    );
  }
}
