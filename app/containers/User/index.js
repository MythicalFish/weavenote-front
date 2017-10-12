import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from 'containers/App/selectors';
import Layout from 'components/Layout';
import Form from './subcomponents/Form';

class Profile extends React.PureComponent {
  render() {
    return (
      <Layout type="boxed" {...this.props}>
        <Form {...this.props} />
      </Layout>
    );
  }
}

Profile.propTypes = {};

export function mapDispatch(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapState = createStructuredSelector({
  user: selectUser(),
});

export default connect(mapState, mapDispatch)(Profile);
