import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../api';

import Heading from '../../components/heading';
import Button from '../../components/button';
import Input from '../../components/input';
import Categories from '../../components/categories';
import BackButton from '../../components/back-button';

import './EditBook.css';

export default class BookRoute extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
  }

  static defaultProps = {
    match: {
      params: {}
    }
  }

  state = {
    loading: true,
    success: false,
    errors: [],
    error: false,
    data: {},
  }

  componentDidMount() {
    const { id = '' } = this.props.match.params;

    if (id) {
      this.fetchBook();
    }
  }

  async fetchBook() {
    const { id = '' } = this.props.match.params;

    const url = `/books/${id}`;

    try {
      const data = await api.get(url);
      this.setState({ loading: false, data: data.result });
    } catch (error) {
      console.error('Error fetching books data', error);
      this.setState({ error: true, loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params !== prevProps.match.params) {
      this.setState({ loading: true });
      this.fetchBook();
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { data } = this.state;

    if (name) {
      data[name] = value;
    }

    this.setState({ data });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { id = '' } = this.props.match.params;
    this.setState({ loading: true });

    const { data } = this.state;

    let result;

    if (id) {
      result = await api.patch(`/books/${id}`, data);
    } else {
      result = await api.post(`/books/`, data);
    }

    if (result.status >= 400) {
      const errors = result.result.errors || [];
      this.setState({ loading: false, errors });
    }

    if (result.status === 200 || result.status === 201) {
      data.id = result.result.id;
      this.setState({ loading: false, success: true });
    }
  }

  render() {
    const { data = {}, loading, error, errors, success } = this.state;

    if (this.props.match.params.id && loading) {
      return (<div>Hleð inn bók...</div>);
    }

    if (this.props.match.params.id && (error || !data)) {
      return (<div>Villa við að hlaða inn bók</div>);
    }

    const title = this.props.match.params.id ? 'Breyta bók' : 'Ný bók';
    const successMessage = this.props.match.params.id ? 'Bók breytt' : 'Bók búin til';
    const isInvalid = (f) => errors.filter((e) => e.field === f).length > 0;

    if (success) {
      return (
        <div>
          <p>{successMessage}</p>
          <p><Link to={`/books/${data.id}`}>Skoða bók</Link></p>
        </div>
      )
    }

    return (
      <div>
        <Helmet title={title} />
        <Heading>{title}</Heading>

        {errors && errors.length > 0 && (
          <ul className="errors">
            {errors.map((e, i) => (
              <li key={i}><label htmlFor={e.field}>{e.message}</label></li>
            ))}
          </ul>
        )}

        <form method="post" onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleInputChange}
            name="title"
            className="edit__input"
            label="Titill"
            value={data.title || ''}
            invalid={isInvalid('title')}
          />

          <Input
            onChange={this.handleInputChange}
            name="author"
            className="edit__input"
            label="Höfundur"
            value={data.author || ''}
            invalid={isInvalid('author')}
          />

          <Input
            onChange={this.handleInputChange}
            name="description"
            className="edit__input"
            type="textarea"
            label="Lýsing"
            value={data.description || ''}
            invalid={isInvalid('description')}
          />

          <Categories
            onChange={this.handleInputChange}
            className="edit__input"
            name="category"
            value={data.category}
            invalid={isInvalid('category')}
          />

          <Input
            onChange={this.handleInputChange}
            name="isbn10"
            className="edit__input"
            label="ISBN10:"
            value={data.isbn10 || ''}
            invalid={isInvalid('isbn10')}
          />

          <Input
            onChange={this.handleInputChange}
            name="isbn13"
            className="edit__input"
            label="ISBN13:"
            value={data.isbn13 || ''}
            invalid={isInvalid('isbn13')}
          />

          <Input
            onChange={this.handleInputChange}
            name="published"
            className="edit__input"
            label="Útgefin:"
            value={data.published || ''}
            invalid={isInvalid('published')}
          />

          <Input
            onChange={this.handleInputChange}
            name="pageCount"
            className="edit__input"
            label="Fjöldi síða:"
            value={data.pageCount || ''}
            invalid={isInvalid('pageCount')}
          />

          <Input
            onChange={this.handleInputChange}
            name="language"
            className="edit__input"
            label="Tungumál:"
            value={data.language || ''}
            invalid={isInvalid('language')}
          />

          <Button className="edit__submit">Vista</Button>
        </form>

        <BackButton>Til baka</BackButton>

      </div>
    );
  }
}