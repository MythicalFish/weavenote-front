import React, { PropTypes } from 'react';
import { fromJS } from 'immutable';
import { FormField } from 'components/FormField';
import onClickOutside from 'react-onclickoutside';
import Actions from './AnnotationActions';

const AnnotationUI = (Component) => {
  class UI extends React.PureComponent {
    static propTypes = {
      focusAnnotation: PropTypes.func,
      updateAnnotation: PropTypes.func,
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
    handleSaveLabel = (e) => {
      e.preventDefault();
      const val = e.target.querySelector('input[name="label"]').value;
      const { focusedAnnotation } = this.props;
      this.props.updateAnnotation(focusedAnnotation.set('label', val));
    };
    cancelOnEsc = (e) => {
      if (e.keyCode === 27) this.cancelActions();
    };
    cancelActions = () => {
      if (this.props.isAnnotating) this.props.cancelAnnotation();
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
    render() {
      return (
        <div>
          {this.props.isAnnotating && (
            <div className="above lh1 smaller2 dark3 py2">
              Hit ESC to cancel
            </div>
          )}
          {this.props.isEditingLabel && (
            <div className="overlay flex-centered bg-dark7 z3">
              <div className="bg-white p3">
                <form onSubmit={this.handleSaveLabel}>
                  <FormField
                    theme="alt1"
                    name="label"
                    label="Annotation label"
                    disableReduxForm
                    focus
                  />
                  <input type="submit" className="conceal" />
                </form>
              </div>
            </div>
          )}
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
