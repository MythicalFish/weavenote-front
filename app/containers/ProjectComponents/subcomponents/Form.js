import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import Price from 'components/Price';
import Dot from 'components/Dot';
import Field from 'components/FormField';

const Form = (props) => {
  const { handleSubmit, onSubmit, submitting, role } = props;
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
      <Field type="display" label="Type" value={material.type.name} />
      <Field type="display" label="Name" value={material.name} />
      <Field type="display" label="Identifier" value={material.identifier} />
      <Field type="display" label="Color" value={color} />
      <Field
        type="text"
        name="quantity"
        label="Quantity"
        focus
        onChange={onSubmit}
      />
      {role.get('name') !== 'Guest' && (
        <Field type="display" label="Cost" value={materialCost} />
      )}
      <button type="submit" disabled={submitting} className="conceal" />
    </form>
  );
};

Form.propTypes = {
  item: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  role: PropTypes.object,
};

export default reduxForm({
  form: 'Component',
})(Form);
