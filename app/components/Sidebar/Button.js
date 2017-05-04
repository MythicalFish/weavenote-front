import React from 'react';
import { Link } from 'react-router';

class Button extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { path, currentPath, label } = this.props;
    let c;
    const p1 = path.split('/')[1];
    const p2 = currentPath.split('/')[1];
    if (p1 === p2) { c = `${c} active`; }
    return (
      <li>
        <Link className={c} to={path}>{label}</Link>
      </li>
    );
  }
}

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  currentPath: React.PropTypes.string,
};

export default Button;
