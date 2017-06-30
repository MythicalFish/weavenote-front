import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Collaborators from 'containers/Collaborators';

class Manage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { organization } = this.props;
    return (
      <div>
        {organization &&
          <div>
            <h1 className="mt0">
              {`${organization.name} settings`}
            </h1>
            <div className="bg-white p2">
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
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { },
    dispatch
  );
}

const mapState = createStructuredSelector({
});

export default connect(mapState, mapDispatch)(Manage);
