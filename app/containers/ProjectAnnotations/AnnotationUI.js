import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import onClickOutside from 'react-onclickoutside';
import { getPosition } from 'utils/canvasPosition';
import Actions from './AnnotationActions';
import Form from './AnnotationForm';
import Canvas from './AnnotationCanvas';

class AnnotationUI extends React.PureComponent {
  static propTypes = {
    setAnchor: PropTypes.func,
    canvasSize: PropTypes.object,
    focusAnnotation: PropTypes.func,
    focusedAnnotation: PropTypes.object,
    cancelAnnotation: PropTypes.func,
    isAnnotating: PropTypes.bool,
    isEditingLabel: PropTypes.bool,
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
    if (this.props.isAnnotating || this.props.isEditingLabel) {
      this.props.cancelAnnotation();
    }
    if (this.props.focusedAnnotation.get('id')) {
      this.props.focusAnnotation(fromJS({}));
    }
    this.hideMenu();
  };
  showMenu = (position) => {
    this.setState({ visible: true, position });
  };
  hideMenu = () => {
    if (this.state.visible) this.setState({ visible: false });
  };
  canvasClick = ({ evt: e }) => {
    const { setAnchor, canvasSize } = this.props;
    setAnchor(getPosition(e, canvasSize));
  };
  render() {
    const { isAnnotating, isEditingLabel } = this.props;
    const { showMenu, hideMenu } = this;
    const cProps = { showMenu, hideMenu, onClick: null };
    if (isAnnotating) cProps.onClick = this.canvasClick;
    return (
      <div>
        {isAnnotating && (
          <div className="above lh1 smaller2 dark3 py2">Hit ESC to cancel</div>
        )}
        {isEditingLabel && <Form {...this.props} />}
        <Actions {...this.state} {...this.props} hideMenu={this.hideMenu} />
        <Canvas {...cProps} {...this.props} />
      </div>
    );
  }
}

export default onClickOutside(AnnotationUI);
