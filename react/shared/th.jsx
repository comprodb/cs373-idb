import React from 'react';

export default class Th extends React.Component {
  render() {
    let arrow;
    if (this.props.sorted) {
      arrow = this.props.reverse ? ' ↓' : ' ↑';
    }

    let link;
    if (this.props.onClick) {
      link = (
        <a href="#" onClick={this.props.onClick}>
          {this.props.title}
        </a>
      );
    } else {
      link = this.props.title;
    }

    return (
      <th>
        {link}
        {arrow}
      </th>
    );
  }
}
