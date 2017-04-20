import React from 'react';
import { Link } from 'react-router';

class Button extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { path, label } = this.props;
    return (
      <li>
        <Link className="block py2 px4 aqua smaller1" to={path}>{label}</Link>
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
