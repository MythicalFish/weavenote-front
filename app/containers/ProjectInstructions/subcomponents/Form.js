import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import InputRow from 'components/FormField';
import Button from 'components/Button';
import ImageThumbnails from 'containers/ImageThumbnails';
import ImageUploader from 'containers/ImageUploader';

const Form = (props) => {
  const { handleSubmit, submitting, initialValues: instruction, label } = props;
  const iProps = {
    maxImages: 3,
    imageable: {
      type: 'Instruction',
      id: instruction.get('id'),
    },
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <Field
          name="title"
          type="text"
          component={InputRow}
          label="Title"
          focus
          onBlur={props.onSubmit}
        />
        <Field
          name="description"
          type="textarea"
          component={InputRow}
          label="Description"
          onBlur={props.onSubmit}
        />
        {instruction.get('images') &&
          <div className="field field-theme-default">
            <label>Images</label>
            <div className="mt1 flex">
              <ImageThumbnails
                images={instruction.get('images')}
                {...iProps}
                deletable
              />
              <ImageUploader {...iProps} />
            </div>
          </div>}
        <button type="submit" disabled={submitting} className="conceal" />
      </div>
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  label: PropTypes.string,
};

export default reduxForm({
  form: 'Instructions',
})(Form);
