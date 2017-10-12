import React, { PropTypes } from 'react';
import Initializer from './Initializer';

class App extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  };
  render() {
    return React.cloneElement(this.props.children, this.props);
  }
}

export default Initializer(App);
