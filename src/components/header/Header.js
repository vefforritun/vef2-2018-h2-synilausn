import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import User from '../user';
import Search from '../search';

import './Header.css';

class Header extends Component {

  render() {
    const { auth } = this.props;

    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>

        <Search className="header__search" />

        <div className="header__user">
          {auth.isAuthenticated && (
            <User />
          )}

          {!auth.isAuthenticated && (
            <Link to="/login">Innskráning</Link>
          )}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Header);
