import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth';

import Button from '../button';

import './User.css';

const defaultImage = '/profile.jpg';

class User extends Component {

  handleLogout = (e) => {
    const { dispatch } = this.props;

    dispatch(logoutUser());
  }

  render() {
    const { auth } = this.props;
    const { name, image } = auth.user || {};

    return (
      <div className="user">
        <div className="user__profile">
          <div className="user__image">
            <Link to="/profile"><img className="user__img" alt="" src={image || defaultImage} /></Link>
          </div>
          <div className="user__text">
            <Link className="user__name" to="/profile">{name}</Link>
            <Button className="user__logout" small onClick={this.handleLogout}>Logout</Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(User);
