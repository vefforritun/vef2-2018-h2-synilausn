import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import Heading from '../../components/heading';

class Home extends Component {

  render() {
    return (
      <div>
        <Helmet title="Forsíða" />
        <Heading>Velkomin á bókasafnið</Heading>

        {this.props.isAuthenticated && (
          <div>
            <p>
              Þú ert skráður notandi og getur því <Link to="/books/new">skráð bækur</Link> og breytt <Link to="/books">þeim sem til eru</Link>.
            </p>
            <p>
              Einnig getur þú skoðað <Link to="/users">aðra notendur.</Link>
            </p>
          </div>
        )}

        {!this.props.isAuthenticated && (
          <div>
            <p>
              Til að njóta bókasafnsins til fullnustu mælum við með að <Link to="/login">skrá sig inn</Link>. Þangað til getur þú skoðað <Link to="/books">allar bækurnar</Link>.
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Home);
