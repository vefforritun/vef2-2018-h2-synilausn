import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from '../../utils/classnames';

import './Button.css';

export default class Books extends Component {

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    warning: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    onClick: () => {},
    disabled: false,
    small: false,
    warning: false,
  }

  render() {
    const { children, className, onClick, disabled, small, warning } = this.props;

    const classes = classnames(
      'button',
      className,
      disabled ? 'button--disabled' : null,
      small ? 'button--small' : null,
      warning ? 'button--warning' : null,
    );

    return (
      <button onClick={onClick} className={classes} disabled={disabled}>{children}</button>
    );
  }

}

