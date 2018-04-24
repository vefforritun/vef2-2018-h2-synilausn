import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import querystring from 'querystring';

import api from '../../api';

import Paging from '../../components/paging';
import Heading from '../../components/heading';

import './Books.css';

export default class Books extends Component {
  state = { loading: true }

  componentDidMount() {
    this.fetchBooks();
  }

  parseQueryString() {
    const { search = '' } = this.props.location;

    let query = '';
    let page = 1;

    if (search) {
      const q = querystring.parse(search.startsWith('?') ? search.substr(1) : search);
      query = q.query;
      page = Number(q.page) || 1;
    }

    return { query, page };
  }

  async fetchBooks() {
    const { query, page = 1 } = this.parseQueryString();

    const limit = 10;
    const offset = (page - 1) * limit;

    let url = `/books?&limit=${limit}&offset=${offset}`;

    if (query) {
      url = `${url}&search=${query}`;
    }

    try {
      const data = await api.get(url);
      this.setState({ loading: false, data: data.result });
    } catch (error) {
      console.error('Error fetching books data', error);
      this.setState({ error: true, loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({ loading: true });
      this.fetchBooks();
    }
  }

  nextPage = (e) => {
    const { history } = this.props;
    const { query, page } = this.parseQueryString();

    history.push(`/books?query=${query}&page=${page + 1}`);
  }

  prevPage = (e) => {
    const { history } = this.props;
    const { query, page } = this.parseQueryString();

    history.push(`/books?query=${query}&page=${page - 1}`);
  }

  render() {
    const { data, loading, error } = this.state;
    const { query, page } = this.parseQueryString();

    let heading = 'Bækur';

    if (query) {
      heading = `Bókaleit: ${query}`;
    }

    if (loading) {
      return (<div>Hleð inn bókum...</div>);
    }

    if (error || !data) {
      return (<div>Villa við að hlaða inn bókum</div>);
    }

    const title = page > 1 ? `Bækur, síða ${page}` : 'Bækur';

    return (
      <section className="books">
        <Helmet title={title} />
        <Heading>{heading}</Heading>

        <ul className="books__list">
          {data && data.items && data.items.map((book, i) => (
            <li className="books__item" key={book.id}>
              <h3 className="books__item-title">
                <Link to={`/books/${book.id}`}>{book.title}</Link>
              </h3>
              <p className="books__item-meta">
                Eftir {book.author}
                {book.published && (
                  <span>, gefin út {book.published}</span>
                )}
              </p>
            </li>
          ))}
        </ul>

        <Paging
          page={page}
          hasPrevPage={page > 1}
          hasNextPage={data.items && data.items.length >= 10}
          onPrevPageClick={this.prevPage}
          onNextPageClick={this.nextPage}
        />
      </section>
    );
  }
}
