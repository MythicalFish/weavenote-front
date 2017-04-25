import React from 'react';

export default class NavigationItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  status() {

  }
  render() {
    return (
      <button onClick={this.props.onClick}>{this.props.label}</button>
    );
  }
}

NavigationItem.propTypes = {
  label: React.PropTypes.string,
  onClick: React.PropTypes.func,
};
