import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectOrganization, selectOrganizations, selectUser } from 'containers/App/selectors';
import Header from 'components/Header';
import { updateOrg, createOrg } from './actions';
import Create from './views/Create';
import NoneYet from './views/NoneYet';
import Manage from './views/Manage';

export class Organization extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = { view: 'start' }

  startCreate = () => {
    this.setState({ view: 'create' });
  }

  create = (data) => {
    this.props.createOrg(data);
    this.setState({ view: null });
  }

  currentView = () => {
    const { organizations } = this.props;
    const { view } = this.state;
    if (view === 'create') {
      return <Create onSubmit={this.create} />;
    } else if (organizations.size > 0) {
      return <Manage {...this.props} />;
    } else if (view === 'start') {
      return <NoneYet onClick={this.startCreate} />;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="p3 md-p4">
          <div className="container-narrow">
            {this.currentView()}
          </div>
        </div>
      </div>
    );
  }
}

Organization.propTypes = {
  user: PropTypes.object,
  organization: PropTypes.object,
  organizations: PropTypes.object,
  createOrg: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { updateOrg, createOrg },
    dispatch
  );
}

const mapState = createStructuredSelector({
  user: selectUser(),
  organization: selectOrganization(),
  organizations: selectOrganizations(),
});

export default connect(mapState, mapDispatch)(Organization);
