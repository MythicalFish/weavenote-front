import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'containers/App/selectors';
import Settings from './subcomponents/Settings';
import Header from 'components/Header';

class Profile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <Header />
        <div className="p3 md-p4">
          <div className="container-narrow">
            <Settings {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectUser(),
});

export default connect(mapState, mapDispatch)(Profile);
