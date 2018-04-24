import React, { Component } from 'react';
import { connect } from 'react-redux';

import Helmet from 'react-helmet';

import { updateUser } from '../../actions/auth';

import api from '../../api';

import Input from '../../components/input';
import Heading from '../../components/heading';
import Button from '../../components/button';
import Validation from '../../components/validation';
import ReadBooks from '../../components/read-books';

import './Profile.css';

class Profile extends Component {
  state = {
    name: '',
    password: '',
    password2: '',
    loading: false,
    errors: [],
  }

  onChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  onChangeName = async (e) => {
    e.preventDefault();

    const { name } = this.state;
    const { dispatch } = this.props;

    dispatch(updateUser({ name }));
  }

  onChangePassword = async (e) => {
    e.preventDefault();

    const { password, password2 } = this.state;

    if (password !== password2) {
      const errors = [{
        field: 'password',
        message: 'Lykilorð passa ekki',
      }]
      this.setState({ errors });
      return;
    }

    this.setState({ loading: true });
    const post = await api.patch('/users/me', { password });

    if (post.status >= 400) {
      const errors = post.result.errors || [];
      this.setState({ loading: false, errors });
    }

    if (post.status === 201) {
      this.setState({ loading: false, registered: true });
    }
  }

  handleUploadFile = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('profile', this.upload.files[0]);

    this.setState({ loading: true });
    const result = await api.post('/users/me/profile', data, true);

    if (result.status >= 400) {
      const errors = result.result.errors || [];
      this.setState({ loading: false, errors });
    }

    if (result.status === 201) {
      this.setState({ loading: false, registered: true });
    }
  }

  render() {
    const { name, password, password2, loading, errors } = this.state;
    const { message } = this.props;

    return (
      <div className="profile">
        <Helmet title="Notandi" />
        <Heading>Upplýsingar</Heading>

        <Validation className="profile__message" errors={errors} />

        {message && (
          <p className="profile__message">{message}</p>
        )}

        <section className="profile__section">
          <form method="post" action="/profile" onSubmit={this.handleUploadFile}>
            <input className="profile__input" ref={(c) => { this.upload = c; }} type="file" name="profile" />
            <Button disabled={loading}>Uppfæra mynd</Button>
          </form>
        </section>

        <section className="profile__section">
          <form onSubmit={this.onChangeName}>
            <Input className="profile__input" name="name" label="Nafn:" value={name} onChange={this.onChange} />
            <Button disabled={loading}>Uppfæra nafn</Button>
          </form>
        </section>

        <section className="profile__section">
          <form onSubmit={this.onChangePassword}>
            <Input className="profile__input" type="password" name="password" label="Lykilorð:" value={password} onChange={this.onChange} />
            <Input className="profile__input" type="password" name="password2" label="Lykilorð, aftur" value={password2} onChange={this.onChange} />
            <Button disabled={loading}>Uppfæra lykilorð</Button>
          </form>
        </section>

        <ReadBooks userId="me" />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.auth.message,
  }
}

export default connect(mapStateToProps)(Profile);
