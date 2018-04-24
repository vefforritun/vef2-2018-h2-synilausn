import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import querystring from 'querystring';

import api from '../../api';

import Paging from '../../components/paging';
import Heading from '../heading';

import ReadBook from './ReadBook.js';

import './ReadBooks.css';

class ReadBooks extends Component {
  state = {
    loading: true,
    success: false,
    errors: [],
    error: false,
    data: {},
  }

  componentDidMount() {
    this.fetchRead();
  }

  parseQueryString() {
    const { search = '' } = this.props.location;

    let page = 1;

    if (search) {
      const q = querystring.parse(search.startsWith('?') ? search.substr(1) : search);
      page = Number(q.page) || 1;
    }

    return { page };
  }

  async fetchRead() {
    const { page = 1 } = this.parseQueryString();

    const limit = 10;
    const offset = (page - 1) * limit;

    const { userId = 'me' } = this.props;

    const url = `/users/${userId}/read?limit=${limit}&offset=${offset}`;

    try {
      const data = await api.get(url);
      this.setState({ loading: false, data: data.result });
    } catch (error) {
      console.error('Error fetching read data', error);
      this.setState({ error: true, loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({ loading: true });
      this.fetchRead();
    }
  }

  nextPage = (e) => {
    const { history } = this.props;
    const { page } = this.parseQueryString();

    history.push(`/profile?page=${page + 1}`);
  }

  prevPage = (e) => {
    const { history } = this.props;
    const { page } = this.parseQueryString();

    history.push(`/profile?&page=${page - 1}`);
  }

  render() {
    const { userId } = this.props;
    const { data = [], loading } = this.state;
    const { page } = this.parseQueryString();

    if (loading) {
      return (<p>Hleð lestri...</p>);
    }

    return (
      <div className="read-book">
        <Heading>Lesnar bækur</Heading>
        {data.items.length > 0 && (
          <React.Fragment>
            <ul className="read-book__list">
              {data.items.map((book) => (
                <ReadBook key={book.id} book={book} userId={userId} />
              ))}
            </ul>
            <Paging
              page={page}
              hasPrevPage={page > 1}
              hasNextPage={data.items && data.items.length >= 10}
              onPrevPageClick={this.prevPage}
              onNextPageClick={this.nextPage}
            />
          </React.Fragment>
        )}

        {data.items.length === 0 && (
          <p>Engar bækur lesnar.</p>
        )}
      </div>
    );
  }
}

export default withRouter(ReadBooks);
