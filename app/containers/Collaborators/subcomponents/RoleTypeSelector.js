import React, { PropTypes } from 'react';
import Dropdown from 'components/Dropdown';

class RoleTypeSelector extends React.PureComponent {
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
            onChanged={this.handleChange}
          />}
      </div>
    );
  }
}

RoleTypeSelector.propTypes = {
  selectedRoleType: PropTypes.func,
  handleChange: PropTypes.func,
  roleTypes: PropTypes.object,
  target: PropTypes.object,
};

export default RoleTypeSelector;
