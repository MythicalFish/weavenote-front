import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList'

const renderDropdownList = ({ input, ...rest }) => {
  console.log(<DropdownList {...input} {...rest} />)
  return (
    <DropdownList
      
    />
  );
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div className="item">  
      <label>{label}</label>
      <input {...input} type={type} />
    </div>
    {touched && error && <span>{error}</span>}
  </div>
);

let Form = (props) => {
  const { handleSubmit, submitting, materialTypes } = props;
  return (
    <form className="itemization" onSubmit={handleSubmit}>
      <Field name="name" type="text" component={renderField} label="Name" />
      <Field
        name="type"
        component={renderDropdownList}
        data={[{ id: 1, name: 'asd' }, { id: 2, name: 'asdasd' }]}
      />
      <Field name="favoriteColor" component="select">
        <option></option>
        <option value="#ff0000">Red</option>
        <option value="#00ff00">Green</option>
        <option value="#0000ff">Blue</option>
      </Field>
      <footer className="p2 center">
        <button className="btn-color2x" type="submit" disabled={submitting}>Save</button>
      </footer>
    </form>
  );
};

Form.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  materialTypes: PropTypes.array,
};

Form = reduxForm({
  form: 'Material',
})(Form);

export default Form;
