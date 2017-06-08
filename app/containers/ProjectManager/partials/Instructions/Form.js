import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
import Uploader from 'components/Uploader';

const Form = (props) => {

  const { handleSubmit, submitting, initialValues: instruction } = props;
  const img = instruction.get('image');

  return (
    <form onSubmit={handleSubmit}>
      <div className="data-rows">
        <Field name="title" type="text" component={DataRow} label="Title" focus />
        <Field name="description" type="textarea" component={DataRow} label="Description" />
        {img &&
          <img src={img.get('url')} />
        }
        <Uploader projectID={instruction.get('projectID')} onFinish={(d) => { console.log('weeeyyyy: ' + d); }} />
        <footer className="p2 center">
          <button className="btn-color2x" type="submit" disabled={submitting}>Save</button>
        </footer>
      </div>
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  projectID: PropTypes.number,
};

export default reduxForm({
  form: 'Instructions',
})(Form);
