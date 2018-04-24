import React, { Component } from 'react';

export default class Validation extends Component {

  render() {
    const { errors } = this.props;

    if (errors.length === 0) {
      return null;
    }

    return (
      <ul className={this.props.className}>
        {errors.map((error, i) => (
          <li key={i}>
            <label htmlFor={error.field}>{error.message}</label>
          </li>
        ))}
      </ul>
    );
  }
}
