import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
import Button from 'components/Button';
import ImageManager from 'containers/ImageManager';
import { selectImages } from './selectors';

const Form = (props) => {
  const { handleSubmit, submitting, initialValues: instruction, label } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="data-rows">
        <Field
          name="title"
          type="text"
          component={DataRow}
          label="Title"
          focus
        />
        <Field
          name="description"
          type="textarea"
          component={DataRow}
          label="Description"
        />
        {instruction.get('id') &&
          <ImageManager
            useModal
            allowEdit
            imageable={{ type: 'Instruction', id: instruction.get('id') }}
            maxImages={5}
            images={props.images}
          />}
        <footer className="p2 center">
          <Button
            type="submit"
            disabled={submitting}
            label={label || 'Save instruction'}
          />
        </footer>
      </div>
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  images: PropTypes.object,
  label: PropTypes.string,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapState = createStructuredSelector({
  images: selectImages(),
});

export default connect(mapState, mapDispatch)(
  reduxForm({
    form: 'Instructions',
  })(Form)
);
