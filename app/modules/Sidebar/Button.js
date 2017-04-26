import React from 'react';
import { Link } from 'react-router';

class Button extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  buttonClass() {
    let c = 'block py2 px4 aqua smaller1';
    if (location.pathname === this.props.path) {
      // c = `${c} bg-gray-darkerer`;
    }
    return c;
  }
  render() {
    const { path, label } = this.props;
    return (
      <li>
        <Link className={this.buttonClass()} to={path}>{label}</Link>
      </li>
    );
  }
}

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool,
};

export default Button;
