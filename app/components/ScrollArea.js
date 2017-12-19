import React, { PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class ScrollArea extends React.PureComponent {
  trackV = ({ style, ...props }) => (
    <div className="track track-vertical" style={style} {...props} />
  );
  thumbV = ({ style, ...props }) => (
    <div className="thumb thumb-vertical" style={{ ...style }} {...props} />
  );
  trackH = ({ style, ...props }) => (
    <div className="track track-horizontal" style={style} {...props} />
  );
  thumbH = ({ style, ...props }) => (
    <div className="thumb thumb-horizontal" style={style} {...props} />
  );
  render() {
    const p = { ...this.props };
    delete p.className;
    delete p.children;
    delete p.style;
    p.autoHide = p.autoHide !== false;
    const dProps = {
      className: this.props.className || null,
      style: this.props.style || null,
    };
    if (p.custom) {
      delete p.custom;
      p.renderTrackHorizontal = this.trackH;
      p.renderThumbHorizontal = this.thumbH;
      p.renderThumbVertical = this.thumV;
      p.renderTrackVertical = this.trackV;
    }
    return (
      <Scrollbars {...p}>
        <div {...dProps}>{this.props.children}</div>
      </Scrollbars>
    );
  }
}

ScrollArea.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default ScrollArea;
