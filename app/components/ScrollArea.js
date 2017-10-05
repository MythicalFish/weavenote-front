import React, { PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class ScrollArea extends React.PureComponent {
  handleUpdate = (e) => {
    console.log(e);
  };
  render() {
    return <Scrollbars autoHide onUpdate={this.handleUpdate} {...this.props} />;
  }
}

ScrollArea.propTypes = {
  children: PropTypes.node,
};

export default ScrollArea;
