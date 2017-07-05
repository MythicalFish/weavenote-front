import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  selectOrganization,
  selectOrganizations,
  selectUser,
} from 'containers/App/selectors';
import Layout from 'components/Layout';
import { createOrganization } from './actions';
import Create from './subcomponents/Create';
import NoneYet from './subcomponents/NoneYet';
import Manage from './subcomponents/Manage';

export class Organization extends React.PureComponent {
  state = { view: 'start' };

  startCreate = () => {
    this.setState({ view: 'create' });
  };

  create = (data) => {
    this.props.createOrganization(data);
    this.setState({ view: null });
  };

  currentView = () => {
    const { organization } = this.props;
    const { view } = this.state;
    if (view === 'create') {
      return <Create onSubmit={this.create} />;
    } else if (organization) {
      return <Manage {...this.props} />;
    } else if (view === 'start') {
      return <NoneYet onClick={this.startCreate} />;
    } else {
      return null;
    }
  };

  render() {
    return (
      <Layout>
        {this.currentView()}
      </Layout>
    );
  }
}

Organization.propTypes = {
  user: PropTypes.object,
  organization: PropTypes.object,
  organizations: PropTypes.object,
  createOrganization: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ createOrganization }, dispatch);
}

const mapState = createStructuredSelector({
  user: selectUser(),
  organization: selectOrganization(),
  organizations: selectOrganizations(),
});

export default connect(mapState, mapDispatch)(Organization);
