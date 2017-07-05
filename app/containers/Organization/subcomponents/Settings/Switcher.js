import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Dropdown from 'components/Dropdown';
import { switchOrganization } from '../../actions';

class Switcher extends React.PureComponent {
  render() {
    const { organization, organizations } = this.props;
    return (
      <div>
        {organizations.size > 1 &&
          <div>
            Switcher
          </div>}
      </div>
    );
  }
}

Switcher.propTypes = {
  organization: PropTypes.object,
  organizations: PropTypes.object,
  switchOrganization: PropTypes.func,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ switchOrganization }, dispatch);
}

const mapState = createStructuredSelector({});

export default connect(mapState, mapDispatch)(Switcher);
