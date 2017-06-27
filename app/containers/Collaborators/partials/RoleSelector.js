import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectRoleTypes } from '../selectors';
import { fetchRoleTypes, updateInvite } from '../actions';
import SelectInput from 'components/SelectInput';

class RoleSelector extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchRoleTypes();
  }
  selectedRoleType = () => {
    const { roleTypes, invite } = this.props;
    if (!roleTypes) return null;
    const key = roleTypes.findKey((obj) => (
      obj.get('id') === invite.get('role_type_id')
    ));
    return roleTypes.get(key);
  }
  handleChange = (roleType) => {
    const { invite } = this.props;
    this.props.updateInvite({ invite, roleType });
  }
  render() {
    const { roleTypes } = this.props;
    const selected = this.selectedRoleType();
    return (
      <div>
        {selected &&
          <div className="input input-sm">  
            <SelectInput value={selected} data={roleTypes} onChange={this.handleChange} />
          </div>
        }
      </div>
    );
  }
}

RoleSelector.propTypes = {
  fetchRoleTypes: PropTypes.func,
  updateInvite: PropTypes.func,
  roleTypes: PropTypes.object,
  invite: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators(
    { fetchRoleTypes, updateInvite },
    dispatch
  );
}

const mapState = createStructuredSelector({
  roleTypes: selectRoleTypes(),
});

export default connect(mapState, mapDispatch)(RoleSelector);
