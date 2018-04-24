import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from '../../utils/classnames';

import './Input.css';

export default class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    label: PropTypes.string,
    className: PropTypes.string,
    invalid: PropTypes.bool,
  }

  static defaultProps = {
    type: 'text',
    onChange: () => {},
  }

  render() {
    const { type, name, value, onChange, label, className, options, invalid, ...rest } = this.props;

    const isTextarea = type === 'textarea';
    const isSelect = type === 'select';
    const isInput = !isTextarea && !isSelect;

    return (
      <div className={classnames('input', invalid ? 'input--invalid' : '')}>
        {label && (
          <label className="input__label" htmlFor={name}>{label}</label>
        )}
        {isTextarea && (
          <textarea
            className={classnames('input__textarea', className)}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            {...rest}
          />
        )}
        {isInput && (
          <input
            className={classnames('input__input', className)}
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            {...rest}
          />
        )}

        {isSelect && (
          <select onChange={onChange} name={name} className={classnames('input__select', className)} value={value}>
            {options.map((option, i) => (
              <option key={i} value={option.value}>{option.label}</option>
            ))}
          </select>
        )}
      </div>
    );
  }
}
