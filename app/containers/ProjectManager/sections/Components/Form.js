
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Field, reduxForm } from 'redux-form/immutable';
import { updateComponent } from '../../actions';
import { selectComponent } from '../../selectors';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="item">
    <label>{label}</label>
    <input {...input} type={type} />
    <div>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const Item = (props) => {
  return (
    <div className="item">
      <div>{props.label}</div>
      <div>{props.value}</div>
    </div>
  );
};

let Form = (props) => {
  const { handleSubmit, submitting, material } = props;
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
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  material: PropTypes.object,
};

Form = reduxForm({
  form: 'Component',
})(Form);

export function mapDispatch(dispatch) {
  return {
    onSubmit: (data) => {
      dispatch(updateComponent(data));
    },
  };
}

Form = connect(null, mapDispatch)(Form);

export default Form;
