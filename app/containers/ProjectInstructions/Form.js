import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { reduxForm, Field } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
import Button from 'components/Button';
import ImageManager from 'containers/ImageManager';
import { selectImage } from './selectors';

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
          <ImageManager maxImages={1} currentImage={props.image} />}
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
  image: PropTypes.object,
};

export function mapDispatch(dispatch) {
  return bindActionCreators({}, dispatch);
}

const mapState = createStructuredSelector({
  image: selectImage(),
});

export default connect(mapState, mapDispatch)(
  reduxForm({
    form: 'Instructions',
  })(Form)
);
