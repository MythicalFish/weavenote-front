import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import Dropdown from 'components/Dropdown';
import { selectRoleTypes } from '../selectors';
import { fetchRoleTypes } from '../actions';

class RoleTypeSelector extends React.PureComponent {
  componentDidMount() {
    this.props.fetchRoleTypes();
  }
  handleChange = (roleType) => {
    const { target } = this.props;
    this.props.handleChange(roleType, target);
  };
  render() {
    const { roleTypes, target } = this.props;
    const selected = this.props.selectedRoleType(roleTypes, target);
    return (
      <div>
        {selected &&
          <Dropdown
            value={selected}
            data={roleTypes}
            onChange={this.handleChange}
          />}
      </div>
    );
  }
}

RoleTypeSelector.propTypes = {
  selectedRoleType: PropTypes.func,
  fetchRoleTypes: PropTypes.func,
  handleChange: PropTypes.func,
  roleTypes: PropTypes.object,
  target: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({ fetchRoleTypes }, dispatch);
}

const mapState = createStructuredSelector({
  roleTypes: selectRoleTypes(),
});

export default connect(mapState, mapDispatch)(RoleTypeSelector);
