import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import Icon from 'components/Icon';

class Content extends React.PureComponent {
  static propTypes = {
    handleClose: PropTypes.func.isRequired,
    noClickOutside: PropTypes.bool,
  };
  state = { klass: '' };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ klass: 'visible' });
    }, 100);
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
    if (p.width) style.width = p.width;
    if (p.height) style.height = p.height;
    if (p.minWidth) style.minWidth = p.minWidth;
    if (p.maxWidth) style.maxWidth = p.maxWidth;
    if (p.minHeight) style.minHeight = p.minHeight;
    let { klass } = this.state;
    if (p.cosy) klass += ' cosy';
    return (
      <div className={`modal-container ${klass}`} style={style}>
        <div className="modal-content">
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

const ModalContent = onClickOutside(Content);

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
        <ModalContent {...p} />
      </div>
    );
  }
}

export default ModalLayout;
