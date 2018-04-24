import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../button';
import Input from '../input';

import classnames from '../../utils/classnames';

import './Search.css';

class Search extends Component {
  state = { value: '' }

  onChange = (e) => {
    const { value } = e.target
    this.setState({ value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;

    history.push(`/books?query=${this.state.value}`);
    this.setState({ value: '' });
  }

  render() {
    const { value } = this.state;

    return (
      <form className={classnames('search', this.props.className)} onSubmit={this.onSubmit}>
        <Input
          placeholder="Bókaleit"
          name="query"
          onChange={this.onChange}
          value={value}
          className="search__input"
        />
        <Button className="search__button" small>Leita</Button>

      </form>
    );
  }
}

export default withRouter(Search);
