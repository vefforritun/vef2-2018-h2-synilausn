import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

import api from '../../api';

import Book from '../../components/book';
import BackButton from '../../components/back-button';

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

  state = { loading: true }

  componentDidMount() {
    this.fetchBook();
  }

  async fetchBook() {
    const { id } = this.props.match.params;

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

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return (<div>Hleð inn bók...</div>);
    }

    if (error || !data) {
      return (<div>Villa við að hlaða inn bók</div>);
    }

    return (
      <div>
        <Helmet title={data.title} />
        <Book
          id={data.id}
          heading={data.title}
          author={data.author}
          description={data.description}
          isbn10={data.isbn10}
          isbn13={data.isbn13}
          category={data.categorytitle}
          published={data.published}
          pageCount={data.pagecount}
          language={data.language}
        />

        <BackButton>Til baka</BackButton>
      </div>
    );
  }
}