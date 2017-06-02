import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Auth from 'containers/Auth';
import Sidebar from 'components/Sidebar';
import { fetchUser } from './actions';
import * as selectors from './selectors';


class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { user } = this.props;
    if (!user) return null;
    return (
      <Auth>
        <div className="flex bg-gray-lightest">
          <div className="flex-none bg-color1x">
            <Sidebar currentPath={this.props.location.pathname} />
          </div>
          <div className="flex-auto">
            {React.Children.toArray(this.props.children)}
          </div>
        </div>
      </Auth>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  location: React.PropTypes.object,
  fetchUser: React.PropTypes.func,
  user: React.PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchUser },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectors.selectUser(),
});

export default connect(mapState, mapDispatch)(App);
