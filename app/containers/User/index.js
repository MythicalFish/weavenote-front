import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'containers/App/selectors';
import Layout from 'components/Layout';
import Settings from './subcomponents/Settings';

class Profile extends React.PureComponent {
  render() {
    return (
      <Layout>
        <Settings {...this.props} />
      </Layout>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapState = createStructuredSelector({
  user: selectUser(),
});

export default connect(mapState, mapDispatch)(Profile);
