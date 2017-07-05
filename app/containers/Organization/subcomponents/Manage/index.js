import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Collaborators from 'containers/Collaborators';
import Settings from './Settings';
import Switcher from './Switcher';
import { updateOrganization } from '../../actions';

class Manage extends React.PureComponent {
  render() {
    const { organization } = this.props;
    return (
      <div>
        <div className="bg-white p2">
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <h2 className="mb0">
                {organization.name}
              </h2>
              <div className="dark5">Organization settings</div>
            </div>
            <div className="col-xs-12 col-sm-6">
              <Switcher {...this.props} />
            </div>
          </div>
        </div>

        <div className="bg-white p2 mt2">
          <h3>General</h3>
          <Settings
            initialValues={organization}
            onSubmit={this.props.handleUpdate}
          />
        </div>

        <div className="bg-white p2 mt2">
          <h3>Collaborators</h3>
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
    dispatch,
  };
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(Manage);
