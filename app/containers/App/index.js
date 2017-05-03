/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Auth, { Auth0 } from 'containers/Auth';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { selectGlobal } from './selectors';
import { getStats } from './actions';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    location: React.PropTypes.object,
  }

  render() {
    return (
      <Auth>
        <div className="flex bg-gray-lightest">
          <div className="flex-none bg-color1x">
            <Sidebar currentPath={this.props.location.pathname} />
          </div>
          <div className="flex-auto">
            <Header>
              <div></div>
              <nav>
                <button className="btn" onClick={() => { Auth0.logout(); }}>Logout</button>
              </nav>
            </Header>
            {React.Children.toArray(this.props.children)}
          </div>
        </div>
      </Auth>
    );
  }
}

export function mapDispatch(dispatch) {
  return {
    getStats: () => { dispatch(getStats()); },
  };
}

const mapState = createStructuredSelector({
  globalState: selectGlobal(),
});

export default connect(mapState, mapDispatch)(App);
