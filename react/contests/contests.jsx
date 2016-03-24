import React from 'react';

export default class Contests extends React.Component {
  render() {
    return (
      <div className="col-md-8 col-md-offset-2">
        {this.props.children}
      </div>
    );
  }
}
