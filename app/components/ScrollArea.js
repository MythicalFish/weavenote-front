import React, { PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class ScrollArea extends React.PureComponent {
  render() {
    const sProps = { ...this.props };
    delete sProps.className;
    delete sProps.children;
    sProps.autoHide = false;
    const dProps = { className: this.props.className || null };
    return (
      <Scrollbars {...sProps}>
        <div {...dProps}>{this.props.children}</div>
      </Scrollbars>
    );
  }
}

ScrollArea.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ScrollArea;
