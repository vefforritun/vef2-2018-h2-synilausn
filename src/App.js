import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom'

import UserRoute from './components/user-route';
import Header from './components/header';

import Home from './routes/home';
import Register from './routes/register';
import Login from './routes/login';
import Books from './routes/books';
import Book from './routes/book';
import Users from './routes/users';
import User from './routes/user';
import Profile from './routes/profile';
import EditBook from './routes/edit-book';
import NotFound from './routes/not-found';

import './App.css';

class App extends Component {

  render() {
    const { auth } = this.props;
    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

        <Header />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/books" exact component={Books} />
            <UserRoute exact path="/books/new" authenticated={auth.isAuthenticated} component={EditBook} />
            <Route exact path="/books/:id" component={Book} />
            <UserRoute exact path="/books/:id/edit" authenticated={auth.isAuthenticated} component={EditBook} />
            <UserRoute exact path="/users" authenticated={auth.isAuthenticated} component={Users} />
            <UserRoute path="/users/:id" authenticated={auth.isAuthenticated} component={User} />
            <UserRoute path="/profile" authenticated={auth.isAuthenticated} component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </div>

      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default withRouter(connect(mapStateToProps)(App));
