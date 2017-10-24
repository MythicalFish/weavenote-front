import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import Icon from 'components/Icon';

class Content extends React.PureComponent {
  static propTypes = {
    handleClose: PropTypes.func.isRequired,
    noClickOutside: PropTypes.bool,
  };
  state = { modalClass: '' };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ modalClass: 'visible' });
    }, 100);
  }
  handleClickOutside = () => {
    const { noClickOutside } = this.props;
    if (noClickOutside) return null;
    return this.handleClose();
  };
  handleClose = () => {
    const { handleClose } = this.props;
    this.setState({ modalClass: '' });
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
    const { modalClass } = this.state;
    return (
      <div className={`modal-content ${modalClass}`} style={style}>
        <div className="modal-body">
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

export default function ModalLayout(props) {
  const p = { ...props };
  if (p.modalClass === undefined) p.modalClass = 'visible';
  return (
    <div className={`modal ${p.modalClass}`}>
      <ModalContent {...props} />
    </div>
  );
}
