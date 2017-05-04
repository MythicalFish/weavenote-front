import React from 'react';
import * as sections from 'containers/App/constants/sections';
import NavItem from 'components/NavItem';

export default class Navigation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  Nav(props) {
    return (
      <NavItem target={props.target} onClick={props.handleClick} />
    );
  }
  render() {
    const Nav = this.Nav;
    const { props } = this;
    return (
      <nav className="tabs">
        <ul>
          <li>
            <Nav {...props} target={sections.Basics} />
          </li>
          <li>
            <Nav {...props} target={sections.Components} />
          </li>
          <li>
            <Nav {...props} target={sections.Measurements} />
          </li>
        </ul>
      </nav>
    );
  }
}
