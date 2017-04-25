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
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Auth from 'containers/Auth';
import { getCurrentPageName } from './actions';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
    getCurrentPageName: React.PropTypes.func,
    location: React.PropTypes.object,
  }

  componentWillMount() {
    //this.props.getCurrentPageName(this.props.location.pathname);
  }

  componentDidUpdate() {
    //this.props.getCurrentPageName(this.props.location.pathname);
  }

  render() {
    return (
      <Auth>
        <div className="flex bg-gray-lightest">
          <div className="flex-none">
            <Sidebar currentPath={this.props.location.pathname} />
          </div>
          <div className="flex-auto">
            <Header />
            <div className="p4">
              {React.Children.toArray(this.props.children)}
            </div>
          </div>
        </div>
      </Auth>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getCurrentPageName: (path) => dispatch(getCurrentPageName(path)),
  };
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
