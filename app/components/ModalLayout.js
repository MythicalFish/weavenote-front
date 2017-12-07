import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import Icon from 'components/Icon';
import sizeMe from 'react-sizeme';

class Content extends React.PureComponent {
  static propTypes = {
    handleClose: PropTypes.func.isRequired,
    noClickOutside: PropTypes.bool,
    size: PropTypes.object,
  };
  state = { klass: '', height: 'auto' };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ klass: 'visible' });
    }, 100);
    setTimeout(() => {
      this.setState({ height: this.props.size.height });
    }, 1000);
  }
  handleClickOutside = () => {
    const { noClickOutside } = this.props;
    if (noClickOutside) return null;
    return this.handleClose();
  };
  handleClose = () => {
    const { handleClose } = this.props;
    this.setState({ klass: '' });
    setTimeout(() => {
      handleClose();
    }, 550);
  };
  render() {
    const p = this.props;
    const style = {};
    const cStyle = {};
    if (p.width) style.width = p.width;
    if (p.minWidth) style.minWidth = p.minWidth;
    if (p.maxWidth) style.maxWidth = p.maxWidth;
    if (p.minHeight) style.minHeight = p.minHeight;
    style.height = p.height || this.state.height;
    if (p.nativeScroll) cStyle.overflowY = 'auto';
    let { klass } = this.state;
    if (p.cosy) klass += ' cosy';
    return (
      <div className={`modal-container ${klass}`} style={style}>
        <div className="modal-content" style={cStyle}>
          {!p.hideCloseButton && (
            <Icon
              name="X"
              className="modal-close"
              onClick={this.handleClose}
              size={20}
            />
          )}
          {p.children}
        </div>
        {p.footer && p.footer}
      </div>
    );
  }
}

const ModalContent = sizeMe({ monitorHeight: true })(onClickOutside(Content));

class ModalLayout extends React.PureComponent {
  state = { klass: '' };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ klass: 'visible' });
    }, 10);
  }
  handleClose = () => {
    const p = this.props;
    this.setState({ klass: '' });
    setTimeout(() => {
      p.handleClose();
    }, 550);
  };
  render() {
    const { klass } = this.state;
    const p = { ...this.props };
    p.handleClose = this.handleClose;
    return (
      <div className={`modal ${klass}`}>
        <ModalContent {...p} outsideClickIgnoreClass="tether-element" />
      </div>
    );
  }
}

export default ModalLayout;
