import React from 'react';

export default class Problems extends React.Component {
  render() {
    return (
      <div>
        <h1>Problems</h1>
        {this.props.children}
      </div>
    );
  }
}
