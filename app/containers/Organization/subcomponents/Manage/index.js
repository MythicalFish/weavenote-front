import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Collaborators from 'containers/Collaborators';
import Switcher from 'components/OrgSwitch';
import Button from 'components/Button';
import OrgInfo from './OrgInfo';
import { updateOrganization } from '../../actions';

class Manage extends React.PureComponent {
  render() {
    const { organization, abilities, startCreate } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <h3 className="mb0">Organization settings</h3>
          </div>
          <div className="col-xs-12 col-sm-6 right-align">
            <Switcher
              {...this.props}
              tail={() => (
                <button type="button" onClick={startCreate}>
                  <i className="fa fa-plus mr2" />
                  Create new organization
                </button>
              )}
            />
          </div>
        </div>
        {!abilities.update && (
          <div>
            <p className="pt3 pb2">
              You're unable to update this Organization's settings.
            </p>
            <Button
              to="/projects"
              label="Return to Styles Overview"
              fontIcon="fa fa-arrow-left"
            />
          </div>
        )}
        {abilities.update && (
          <div>
            <div className="bg-white p2 mt2">
              <h4>General</h4>
              <OrgInfo
                initialValues={organization}
                onSubmit={this.props.handleUpdate}
              />
            </div>

            <div className="bg-white p2 mt2">
              <h4>Collaborators</h4>
              <Collaborators
                invitable={{ type: 'Organization', id: organization.get('id') }}
                roleTypes={organization.get('role_types')}
                {...this.props}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

Manage.propTypes = {
  organization: PropTypes.object,
  handleUpdate: PropTypes.func,
  startCreate: PropTypes.func,
  abilities: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return {
    handleUpdate: (data) => {
      dispatch(updateOrganization(data));
    },
  };
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(Manage);
