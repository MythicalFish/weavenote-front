import React, { PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class ScrollArea extends React.PureComponent {
  componentDidMount() {
    // setTimeout(() => {
    //   this.ref.scrollTop(20);
    // }, 2000);
  }
  handleRef = (s) => (this.ref = s);
  render() {
    const sProps = {
      autoHide: true,
      onUpdate: this.props.onUpdate || null,
    };
    const dProps = { ...this.props };
    delete dProps.autoHide;
    delete dProps.onUpdate;
    return (
      <Scrollbars {...sProps} ref={this.handleRef}>
        <div {...dProps} />
      </Scrollbars>
    );
  }
}

ScrollArea.propTypes = {
  onUpdate: PropTypes.func,
};

export default ScrollArea;
