import React, { Component } from 'react';

import api from '../../api';

import Input from '../../components/input';
import Button from '../button';

import './Read.css';

export default class Read extends Component {
  state = {
    show: false,
    rating: '',
    review: '',
    success: false,
    errors: [],
  }

  show = () => {
    this.setState({ show: true })
  }

  hide = (e) => {
    e.preventDefault();
    this.setState({ show: false })
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const { rating, review } = this.state;
    const { bookId } = this.props;

    const result = await api.post('/users/me/read', { bookId, rating: Number(rating), review });

    if (result.status >= 400) {
      const errors = result.result.errors || [];
      this.setState({ loading: false, errors });
    }

    if (result.status === 201) {
      this.setState({ loading: false, success: true });
    }
  }

  render() {
    const { show, errors, review, rating, success } = this.state;

    const ratings = [
      { label: '– Veldu einkunn –', value: 0 },
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
    ]
    const isInvalid = (f) => errors.filter((e) => e.field === f).length > 0;

    if (success) {
      return (<p>Lestur skráður</p>);
    }

    if (!show) {
      return (
        <Button onClick={this.show}>Skrá lestur</Button>
      );
    }

    return (
      <div className="read">
        {errors && errors.length > 0 && (
          <ul className="errors">
            {errors.map((e, i) => (
              <li key={i}><label htmlFor={e.field}>{e.message}</label></li>
            ))}
          </ul>
        )}

        <form className="read__form" method="post" onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleInputChange}
            name="review"
            className="read__input"
            type="textarea"
            label="Um bók"
            value={review}
            invalid={isInvalid('review')}
          />
          <Input
            onChange={this.handleInputChange}
            name="rating"
            className="read__input"
            type="select"
            label="Einkunn:"
            options={ratings}
            value={rating}
            invalid={isInvalid('rating')}
          />

          <div className="read__buttons">
            <Button type="submit">Vista</Button>
            <Button small warning onClick={this.hide}>Hætta við</Button>
          </div>

        </form>
      </div>
    );
  }
}
