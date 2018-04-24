import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../api';

import Heading from '../../components/heading';
import Button from '../../components/button';
import Input from '../../components/input';
import Validation from '../../components/validation';

import './Register.css';

class Login extends Component {
  state = {
    username: '',
    password: '',
    name: '',
    loading: false,
    registered: false,
    errors: [],
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

    const { username, password, name } = this.state;

    const post = await api.post('/register', { username, password, name });

    if (post.status >= 400) {
      const errors = post.result.errors || [];
      this.setState({ loading: false, errors });
    }

    if (post.status === 201) {
      this.setState({ loading: false, registered: true });
    }
  }

  render() {
    const { username, password, name, loading, errors, registered } = this.state;

    if (registered) {
      return (
        <div>
          <Heading>Nýskráning tókst!</Heading>
          <p><a href="/login">Innskráning</a></p>
        </div>
      );
    }

    return (
      <div>
        <Heading>Nýskráning</Heading>

        <Validation errors={errors} />

        <form className="login__form" onSubmit={this.handleSubmit}>

          <Input className="login__input" label="Notendanafn:" name="username" value={username} onChange={this.handleInputChange} />
          <Input className="login__input" type="password" label="Lykilorð:" name="password" value={password} onChange={this.handleInputChange} />
          <Input className="login__input" label="Nafn:" name="name" value={name} onChange={this.handleInputChange} />

          <Button className="login__button" disabled={loading}>Nýskrá</Button>
        </form>

        <p><Link className="login__link" to="/login">Innskráning</Link></p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  }
}

export default connect(mapStateToProps)(Login);
