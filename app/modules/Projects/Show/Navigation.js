import React from 'react';
import NavigationItem from './NavigationItem';

export default class Navigation extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  handleChange() {

  }
  render() {
    return (
      <nav className="tabs">
        <ul>
          <li>
            <NavigationItem label="Basics" onClick={() => { this.props.onChange('basics'); }} />
          </li>
          <li>
            <NavigationItem label="Materials" onClick={() => { this.props.onChange('materials'); }} />
          </li>
          <li>
            <NavigationItem label="Measurements" onClick={() => { this.props.onChange('measurements'); }} />
          </li>
        </ul>
      </nav>
    );
  }
}

Navigation.propTypes = {
  onChange: React.PropTypes.func,
};
