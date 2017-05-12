import React from 'react';

class Header extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="flex items-center justify-between p2 bg-white dark8 bb1">
        {this.props.children}
      </div>
    );
  }
}

Header.propTypes = {
  children: React.PropTypes.node,
};


export default Header;
