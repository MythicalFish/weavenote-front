import React, { PropTypes } from 'react';
import { FormField } from 'components/FormField';
import onClickOutside from 'react-onclickoutside';

class AnnotationForm extends React.PureComponent {
  handleSaveLabel = (e) => {
    e.preventDefault();
    const val = this.labelInput.value;
    const { focusedAnnotation } = this.props;
    this.props.updateAnnotation(focusedAnnotation.set('label', val));
  };
  handleClickOutside = () => {
    console.log('hai');
    this.handleSaveLabel();
  };
  render() {
    return (
      <div className="bg-white p3">
        <form onSubmit={this.handleSaveLabel}>
          <FormField
            theme="alt1"
            name="label"
            label="Annotation label"
            disableReduxForm
            defaultValue={this.props.focusedAnnotation.get('label')}
            handleRef={(ref) => (this.labelInput = ref)}
            focus
          />
          <input type="submit" className="conceal" />
        </form>
      </div>
    );
  }
}

AnnotationForm.propTypes = {
  focusedAnnotation: PropTypes.object,
  updateAnnotation: PropTypes.func,
};

export default onClickOutside(AnnotationForm);
