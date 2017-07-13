import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import Price from 'components/Price';
import Dot from 'components/Dot';
import DataRow from 'components/DataRow';
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
      <DataRow type="display" label="Type" value={material.type.name} />
      <DataRow type="display" label="Name" value={material.name} />
      <DataRow type="display" label="Identifier" value={material.identifier} />
      <DataRow type="display" label="Color" value={color} />
      <Field
        type="text"
        name="quantity"
        label="Quantity"
        component={DataRow}
        focus
      />
      <DataRow type="display" label="Cost" value={materialCost} />
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
