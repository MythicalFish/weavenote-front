import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Collaborators from 'containers/Collaborators';
import Form from './Form';
import { updateOrganization } from '../../actions';

class Manage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { organization } = this.props;
    return (
      <div>
        {organization &&
          <div>
            <h2 className="mt0">
              {`${organization.name} settings`}
            </h2>
            <div className="bg-white p2">
              <Form
                initialValues={organization}
                onSubmit={this.props.handleUpdate}
              />
            </div>
            <div className="bg-white p2 mt2">
              <Collaborators invitable={{ type: 'Organization', id: organization.id }} />
            </div>
          </div>
        }
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

const mapState = createStructuredSelector({
});

export default connect(mapState, mapDispatch)(Manage);
