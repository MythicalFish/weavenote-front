import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import Actions from './AnnotationActions';

const AnnotationUI = (Component) => {
  class UI extends React.PureComponent {
    static propTypes = {
      cancelAnnotation: PropTypes.func,
      isAnnotating: PropTypes.bool,
    };
    state = { visible: false, position: { x: 0, y: 0 } };
    componentDidMount() {
      document.addEventListener('keydown', this.cancelOnEsc, false);
    }
    handleClickOutside = () => {
      this.cancelActions();
    };
    cancelOnEsc = (e) => {
      if (e.keyCode === 27) this.cancelActions();
    };
    cancelActions = () => {
      if (this.props.isAnnotating) this.props.cancelAnnotation();
      this.hideMenu();
    };
    showMenu = (position) => {
      this.setState({ visible: true, position });
    };
    hideMenu = () => {
      if (this.state.visible) this.setState({ visible: false });
    };
    render() {
      return (
        <div>
          <Actions {...this.state} {...this.props} hideMenu={this.hideMenu} />
          <Component
            showMenu={this.showMenu}
            hideMenu={this.hideMenu}
            {...this.props}
          />
        </div>
      );
    }
  }
  return onClickOutside(UI);
};

export default AnnotationUI;
