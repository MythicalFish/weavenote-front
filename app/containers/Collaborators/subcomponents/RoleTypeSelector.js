import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';

class RoleTypeSelector extends React.PureComponent {
  handleChange = (roleType) => {
    const { current } = this.props;
    this.props.handleChange(roleType, current);
  };
  render() {
    const { roleTypes, current, isOwnRole } = this.props;
    if (isOwnRole) return <span>{current.get('role_type_name')}</span>;
    const selected = this.props.selectedRoleType(roleTypes, current);
    return (
      <div>
        {selected && (
          <Dropdown
            value={selected}
            data={roleTypes}
            onChanged={this.handleChange}
          />
        )}
      </div>
    );
  }
}

RoleTypeSelector.propTypes = {
  isOwnRole: PropTypes.bool,
  selectedRoleType: PropTypes.func,
  handleChange: PropTypes.func,
  roleTypes: PropTypes.object,
  current: PropTypes.object,
};

export default RoleTypeSelector;
