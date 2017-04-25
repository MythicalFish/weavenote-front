/**
*
* Dropdown
*
*/

import React from 'react';

class Dropdown extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.setState({ active: false });
  }
  toggleMenu() {
    {
      this.state.active
        ? this.setState({ active: false })
        : this.setState({ active: true })
    }
  }
  render() {
    const { label, menuItems } = this.props;
    let menu;
    if (this.state.active) {
      menu = (
        <div className="dropdown-content x10 center">
          {menuItems()}
        </div>
      );
    }
    return (
      <div className="dropdown">
        <button onClick={() => { this.toggleMenu(); }}>
          {label}
        </button>
        {menu}
      </div>
    );
  }
}

Dropdown.propTypes = {
  label: React.PropTypes.string.isRequired,
  menuItems: React.PropTypes.func.isRequired,
};

export default Dropdown;
