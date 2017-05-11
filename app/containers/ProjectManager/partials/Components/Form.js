import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div className="data-row">  
      <label>{label}</label>
      <input {...input} type={type} />
    </div>
    {touched && error && <span>{error}</span>}
  </div>
);

const Item = (props) => {
  return (
    <div className="data-row">
      <label>{props.label}</label>
      <div className="right-align">{props.value}</div>
    </div>
  );
};

let Form = (props) => {
  const { handleSubmit, submitting } = props;
  const material = props.material.toJS();
  return (
    <form onSubmit={handleSubmit}>
      <Item label="Type" value={material.type.name} />
      <Item label="Name" value={material.name} />
      <Item label="Identifier" value={material.identifier} />
      <Item
        label="Color"
        value={(
          <div>
            <div className="dot mr1" style={{ backgroundColor: material.color.hex_code }}></div>
            {material.color.name}
          </div>
        )}
      />
      <Field name="quantity" type="text" component={renderField} label="Quantity" />
      <footer className="p2 center">
        <button className="btn-color2x" type="submit" disabled={submitting}>Save</button>
      </footer>
    </form>
  );
};

Form.propTypes = {
  submitting: PropTypes.bool,
  material: PropTypes.object,
  handleSubmit: PropTypes.func,
};

Form = reduxForm({
  form: 'Component',
})(Form);

export default Form;
