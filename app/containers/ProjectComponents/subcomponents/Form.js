import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import Price from 'components/Price';
import Dot from 'components/Dot';
import FormField from 'components/FormField';
import Button from 'components/Button';

const Form = (props) => {
  const { handleSubmit, submitting } = props;
  const item = props.item.toJS();
  const material = item.material;
  const materialCost = <Price value={item.material_cost} />;
  const color = (
    <div>
      {material.color.name}
      <Dot className="ml1" color={material.color.hex_code} />
    </div>
  );
  return (
    <form onSubmit={handleSubmit}>
      <FormField type="display" label="Type" value={material.type.name} />
      <FormField type="display" label="Name" value={material.name} />
      <FormField
        type="display"
        label="Identifier"
        value={material.identifier}
      />
      <FormField type="display" label="Color" value={color} />
      <Field
        type="text"
        name="quantity"
        label="Quantity"
        component={FormField}
        focus
      />
      <FormField type="display" label="Cost" value={materialCost} />
      <footer className="p2 center">
        <Button type="submit" disabled={submitting} label="Save" />
      </footer>
    </form>
  );
};

Form.propTypes = {
  item: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'Component',
})(Form);
