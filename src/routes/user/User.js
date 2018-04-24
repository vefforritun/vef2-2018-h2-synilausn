import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import api from '../../api';

import Heading from '../../components/heading';
import ReadBooks from '../../components/read-books';

import DefaultImage from '../../profile.jpg';
import './User.css';

export default class User extends Component {
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
    this.fetchUser();
  }

  async fetchUser() {
    const { id } = this.props.match.params;

    const url = `/users/${id}`;

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
    const { id } = this.props.match.params;

    if (loading) {
      return (<div>Hleð inn notanda...</div>);
    }

    if (error || !data) {
      return (<div>Villa við að sækja notanda</div>);
    }

    return (
      <div className="user">
        <Helmet title={data.name} />

        <div className="user__image">
          <Link to="/profile"><img className="user__img" alt="" src={data.image || DefaultImage} /></Link>
        </div>

        <Heading>{data.name}</Heading>
        <div class="user__read">
          <ReadBooks userId={id} url="/users" />
        </div>
      </div>
    );
  }
}