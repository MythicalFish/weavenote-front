import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from 'components/Layout';
import { createOrganization } from './actions';
import Create from './subcomponents/Create';
import GetStarted from './subcomponents/GetStarted';
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
    const abilities = this.props.abilities.get('Organization').toJS();
    const oProps = { ...this.props, abilities };
    const { view } = this.state;
    if (view === 'create') {
      return <Create onSubmit={this.create} />;
    } else if (organization) {
      return <Manage {...oProps} startCreate={this.startCreate} />;
    } else if (view === 'start') {
      return <GetStarted onClick={this.startCreate} />;
    } else {
      return null;
    }
  };

  render() {
    return (
      <Layout scrollable type="boxed" {...this.props}>
        {this.currentView()}
      </Layout>
    );
  }
}

Organization.propTypes = {
  abilities: PropTypes.object,
  organization: PropTypes.object,
  createOrganization: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ createOrganization }, dispatch);
}

export default connect(null, mapDispatch)(Organization);
