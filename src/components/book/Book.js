import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Read from '../read';

import './Book.css';

export default class Header extends Component {

  render() {
    const { heading, author, description, published, language, pageCount, category } = this.props;

    return (
      <div className="book">

        <div className="book__about">
          <h3>{heading}</h3>
          <p>Eftir {author}</p>
          <p>ISBN13: {this.props.isbn13}</p>
          <p>{category}</p>
          <p>{description}</p>

          {pageCount && (
            <p>{pageCount} síður</p>
          )}

          {published && (
            <p>Gefin út {published}</p>
          )}

          {language && (
            <p>Tungumál: {language}</p>
          )}

          <div className="book__buttons">
            <Link to={`/books/${this.props.id}/edit`}>Breyta bók</Link>
          </div>
        </div>

        <Read
          className="book__button"
          bookId={this.props.id}
        />

      </div>
    );
  }
}
