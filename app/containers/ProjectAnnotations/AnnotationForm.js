import React, { PropTypes } from 'react';
import { FormField } from 'components/FormField';

class AnnotationForm extends React.PureComponent {
  handleSaveLabel = (e) => {
    e.preventDefault();
    const val = this.labelInput.value;
    const { focusedAnnotation } = this.props;
    this.props.updateAnnotation(focusedAnnotation.set('label', val));
  };
  render() {
    return (
      <div className="overlay flex-centered bg-dark7 z3">
        <div className="overlay" onClick={this.handleSaveLabel} />
        <div className="bg-white p3 z3">
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
      </div>
    );
  }
}

AnnotationForm.propTypes = {
  focusedAnnotation: PropTypes.object,
  updateAnnotation: PropTypes.func,
};

export default AnnotationForm;
