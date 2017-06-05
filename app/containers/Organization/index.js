import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentOrg, selectOrgs } from 'containers/App/selectors';
import { updateOrg, createOrg } from './actions';
import Create from './views/Create';
import NoneYet from './views/NoneYet';
import Manage from './views/Manage';

export class Organization extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = { view: null }

  componentWillMount() {
    const { orgs } = this.props;
    if (orgs.size < 1) {
      this.setState({ view: 'noneYet' });
    }
  }

  createOrg = (data) => {
    this.props.createOrg(data);
    this.setState({ view: null });
  }

  currentView = () => {
    switch (this.state.view) {
      case 'noneYet':
        return <NoneYet onClick={() => { this.setState({ view: 'create' }); }} />
      case 'create':
        return <Create onSubmit={this.createOrg} />;
      default:
        return <Manage />;
    }
  }

  render() {
    return (
      <div className="p3 md-p4">
        <div className="container-narrow">
          {this.currentView()}
        </div>
      </div>
    );
  }
}

Organization.propTypes = {
  currentOrg: PropTypes.object,
  orgs: PropTypes.object,
  createOrg: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { updateOrg, createOrg },
    dispatch
  );
}

const mapState = createStructuredSelector({
  currentOrg: selectCurrentOrg(),
  orgs: selectOrgs(),
});

export default connect(mapState, mapDispatch)(Organization);
