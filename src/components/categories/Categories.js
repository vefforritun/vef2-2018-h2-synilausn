import React, { Component } from 'react';
import PropTypes from 'prop-types';

import api from '../../api';

import Input from '../input';

export default class Categories extends Component {
  state = {
    data: null,
    loading: true,
    error: false,
  }

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
  }

  componentDidMount() {
    this.fetchCategories();
  }

  async fetchCategories() {
    const url = `/categories/`;

    try {
      const data = await api.get(url);
      this.setState({ loading: false, data: data.result });
    } catch (error) {
      console.error('Error fetching categories', error);
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { value, onChange, name } = this.props;
    const { loading, data, error } = this.state;

    if (loading) {
      return (<div>Hleð inn flokkum...</div>);
    }

    if (error) {
      return (<div>Villa við að hlaða inn flokkum</div>);
    }

    const categories = [{ value: '', label: '– Veldu flokk –'}].concat(data.items.map((cat) => ({ value: cat.id, label: cat.title })));

    return (
      <Input onChange={onChange} name={name} className="edit__input" type="select" label="Flokkur:" options={categories} value={value} />
    );
  }
}
