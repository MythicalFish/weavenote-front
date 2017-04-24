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
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Auth from 'containers/Auth';

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <Auth>
        <div className="flex bg-gray-lightest">
          <div className="flex-none">
            <Sidebar />
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
