import React, { PropTypes } from 'react';

class Dropdown extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = { active: false }

  toggleState = () => {
    this.setState({ active: !this.state.active });
  }
  render() {
    const { label, children } = this.props;
    let menu;
    if (this.state.active) {
      menu = (
        <div className="dropdown-content x10 center">
          {children}
        </div>
      );
    }
    return (
      <div className="dropdown">
        <button type="button" onClick={this.toggleState}>
          {label}
        </button>
        {menu}
      </div>
    );
  }
}

Dropdown.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  children: React.PropTypes.node,
};

export default Dropdown;
