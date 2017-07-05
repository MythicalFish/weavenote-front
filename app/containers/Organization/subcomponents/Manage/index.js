import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Collaborators from 'containers/Collaborators';
import Settings from './Settings';
import Switcher from './Switcher';
import { updateOrganization, switchOrganization } from '../../actions';

class Manage extends React.PureComponent {
  render() {
    const { organization } = this.props;
    return (
      <div>
        <div className="bg-white p2">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <h3 className="mb0">Organization settings</h3>
            </div>
            <div className="col-xs-12 col-sm-6 right-align">
              <Switcher {...this.props} />
            </div>
          </div>
        </div>

        <div className="bg-white p2 mt2">
          <h4>General</h4>
          <Settings
            initialValues={organization}
            onSubmit={this.props.handleUpdate}
          />
        </div>

        <div className="bg-white p2 mt2">
          <h4>Collaborators</h4>
          <Collaborators
            invitable={{ type: 'Organization', id: organization.id }}
          />
        </div>
      </div>
    );
  }
}

Manage.propTypes = {
  organization: PropTypes.object,
  handleUpdate: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return {
    handleUpdate: (data) => {
      dispatch(updateOrganization(data));
    },
    switchOrganization: (id) => {
      dispatch(switchOrganization(id));
    },
  };
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(Manage);
