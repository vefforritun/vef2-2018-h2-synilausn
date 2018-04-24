import React, { Component } from 'react';

import './Heading.css';

export default class Header extends Component {

  render() {
    const { children } = this.props;

    return (
      <h2 className="heading">{children}</h2>
    );
  }
}
