import React from 'react';

export default class SubHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <header className="subHeader bb1 bg-white">
        {this.props.children}
      </header>
    );
  }
}

SubHeader.propTypes = {
  children: React.PropTypes.node,
};
