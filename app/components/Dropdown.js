import React, { PropTypes } from 'react';

class Dropdown extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = { active: false, className: '' }

  toggleState = () => {
    this.setState({ active: !this.state.active });
  }

  handleClick = () => {
    if (this.state.active) {
      this.setState({ className: '' });
      setTimeout(() => {
        this.toggleState();
      }, 200);
    } else {
      this.toggleState();
      setTimeout(() => {
        this.setState({ className: 'open' });
      }, 1);
    }
  }

  render() {
    const { label, children, width, className } = this.props;
    let menu;
    let widthClass = 'x10';
    if (width) widthClass = `x${width}`;
    let pClass = className || '';
    pClass += ` ${widthClass} ${this.state.className}`;
    if (this.state.active) {
      menu = (
        <div className={`dropdown-content center ${pClass}`}>
          {children}
        </div>
      );
    }
    return (
      <div className="dropdown">
        <button type="button" onClick={this.handleClick}>
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
  width: React.PropTypes.string,
  className: React.PropTypes.string,
};

export default Dropdown;
