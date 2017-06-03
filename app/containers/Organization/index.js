import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentOrg, selectOrgs } from 'containers/App/selectors';
import { updateOrg, createOrg } from './actions';

export class Organization extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  state = { view: null }

  componentWillMount() {
    const { orgs } = this.props;
    if (orgs.size < 1) {
      this.setState({ view: 'noneYet' });
    }
  }

  noneYet = () => (
    <div>
      Looks like you do not belong to a Seamless organization yet.
      <div className="mt2">
        <button type="button" className="btn-color2x" onClick={() => { this.setState({ view: 'create' }); }}>
          <i className="fa fa-plus mr1"></i>
          Create an organization
        </button>
      </div>
    </div>
  )

  create = () => (
    <div>
      <form onSubmit={this.doCreate}>
        <input type="text" name="name" placeholder="Name your organization" />
        <button type="submit" className="btn-color2x">
          Submit
        </button>
      </form>
    </div>
  )

  doCreate = (e, data) => {
    e.preventDefault();
    console.log(data);
    this.props.createOrg();
  }

  currentView = () => {
    switch (this.state.view) {
      case 'noneYet':
        return this.noneYet();
      case 'create':
        return this.create();
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="p3 md-p4">
        {this.currentView()}
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
