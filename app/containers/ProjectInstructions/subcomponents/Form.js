import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import InputRow from 'components/FormField';
import Button from 'components/Button';
import ImageThumbnails from 'components/ImageThumbnails';
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
  const onBlur = props.disableSaveOnBlur ? null : props.onSubmit;
  const images = instruction.get('images') || fromJS([]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <Field
          name="title"
          type="text"
          component={InputRow}
          label="Title"
          placeholder="Eg. Ironing"
          focus
          onBlur={onBlur}
        />
        <Field
          name="description"
          type="textarea"
          component={InputRow}
          label="Description"
          onBlur={onBlur}
        />
        {images && (
          <div className="field field-theme-default">
            <label>Images</label>
            <div className="mt1 flex">
              <ImageThumbnails images={images} {...iProps} />
            </div>
          </div>
        )}
        {images.size < iProps.maxImages && <ImageUploader {...iProps} />}
        {!props.disableSaveOnBlur && (
          <button type="submit" disabled={submitting} className="conceal" />
        )}
        {props.disableSaveOnBlur && <Button type="submit" label="Create" />}
      </div>
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  disableSaveOnBlur: PropTypes.bool,
  label: PropTypes.string,
};

export default reduxForm({
  form: 'Instructions',
})(Form);
