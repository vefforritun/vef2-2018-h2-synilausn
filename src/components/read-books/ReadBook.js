import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../../api';

import Button from '../../components/button';

export default class ReadBooks extends Component {
  state = {
    deleting: false,
    deleted: false,
    error: false,
  }

  handleDelete = (id) => {
    return async (e) => {
      const url = `/users/me/read/${id}`;
      this.setState({ deleting: true });

      try {
        const response = await api.delete(url, {});
        console.log(response)
        this.setState({ deleted: true, deleting: false });
      } catch (error) {
        console.error('Error fetching read data', error);
        this.setState({ error: true, deleting: false });
      }
    };
  }

  render() {
    const { userId, book } = this.props;
    const { deleting, deleted, error } = this.state;

    if (error) {
      return (<li className="read-book__item">Villa við að eyða</li>);
    }

    if (deleting) {
      return (<li className="read-book__item">Eyði lestri...</li>);
    }

    if (deleted) {
      return (<li className="read-book__item">Lestri eytt</li>);
    }

    const isMe = userId === 'me';

    return (
      <li className="read-book__item" key={book.id}>
        <h3 className="read-book__item-title">
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </h3>
        <p>Einkunn: {book.rating}</p>
        {book.review && (
          <p>Um bókina: {book.review}</p>
        )}
        {isMe && (
          <Button warning className="read-book__delete" onClick={this.handleDelete(book.id)}>Eyða</Button>
        )}
      </li>
    );
  }
}
