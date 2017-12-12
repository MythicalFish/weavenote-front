import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import Field from 'components/FormField';
import Button from 'components/Button';
import ImageThumbnails from 'components/ImageThumbnails';
import ImageUploader from 'containers/ImageUploader';

const Form = (props) => {
  const {
    handleSubmit,
    submitting,
    initialValues: instruction,
    readOnly,
  } = props;
  const iProps = {
    maxImages: 3,
    imageable: {
      type: 'Instruction',
      id: instruction.get('id'),
    },
  };
  const onChange = props.disableAutosave ? null : props.onSubmit;
  const images = instruction.get('images') || fromJS([]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="">
        <Field
          name="title"
          type="text"
          label="Title"
          placeholder="Eg. Ironing"
          focus
          onChange={onChange}
          readOnly={!!readOnly}
        />
        <Field
          name="description"
          type="textarea"
          label="Description"
          onChange={onChange}
          readOnly={!!readOnly}
        />
        <ImageThumbnails images={images} {...iProps} />
        {!readOnly &&
          images.size < iProps.maxImages && (
            <ImageUploader
              {...iProps}
              label="Upload image"
              btnClass="btn-secondary btn-sm"
              fontIcon="far fa-file-image"
            />
          )}
        {!props.disableAutosave && (
          <button type="submit" disabled={submitting} className="conceal" />
        )}
        {props.disableAutosave && (
          <div className="right-align">
            <span className="mr2">
              <Button
                secondary
                inline
                label="Cancel"
                onClick={props.toggleCreate}
              />
            </span>
            <Button type="submit" label="Create" />
          </div>
        )}
      </div>
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  disableAutosave: PropTypes.bool,
  readOnly: PropTypes.bool,
};

export default reduxForm({
  form: 'Instructions',
})(Form);
