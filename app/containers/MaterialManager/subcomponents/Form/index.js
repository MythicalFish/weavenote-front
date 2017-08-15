import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import FocusableField, { FormField } from 'components/FormField';
import Button from 'components/Button';
import Supplier from './Supplier';
import CareLabels from './CareLabels';

class Form extends React.Component {
  state = { type: null };

  componentWillMount = () => {
    const { initialValues: v } = this.props;
    const type = v.get('type');
    if (type) this.switchType(type);
  };

  switchType = (type) => {
    this.setState({ type: type.get('name') });
  };

  is = (type) => {
    let t = type;
    if (!Array.isArray(t)) t = [t];
    return t.includes(this.state.type);
  };

  showFor = (type) => {
    if (!this.is(type)) return 'conceal';
    return '';
  };

  render() {
    const {
      handleSubmit,
      submitting,
      types,
      colors,
      currencies,
      labels,
      suppliers,
      newSupplier,
      addCareLabel,
      removeCareLabel,
    } = this.props;
    const { type } = this.state;
    const { showFor } = this;

    const restricted = !this.props.abilities.Material.update;

    const F = (fProps) => {
      const p = { ...fProps };
      p.className = p.c;
      p.component = p.type === 'select' ? FormField : FocusableField;
      p.style = 'alt1';
      delete p.c;
      return <Field {...{ restricted, ...p }} />;
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="pr3">
              <div className="mb3">
                <F
                  name="type"
                  type="select"
                  label="Type"
                  data={types}
                  onChanged={this.switchType}
                />
                <F name="name" label="Name" />
                <F name="identifier" label="Identifier" />
                <F name="color" type="select" label="Color" data={colors} />
                <F
                  name="composition"
                  label="Composition"
                  c={showFor('Fabric')}
                />
                <F name="size" label="Size" c={showFor(['Button', 'Zip'])} />
                <F name="length" label="Length" c={showFor('Zip')} />
                <F name="subtype" label="Zip Type" c={showFor('Zip')} />
                <F
                  name="opening_type"
                  label="Opening Type"
                  c={showFor('Zip')}
                />
              </div>
              <div>
                <F
                  name="currency"
                  type="select"
                  label="Currency"
                  data={currencies}
                />
                <F name="cost_base" label="Base cost" />
                <F name="cost_delivery" label="Delivery cost" />
                <F name="cost_extra1" label="Extra cost 1" />
                <F name="cost_extra2" label="Extra cost 2" />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="pl3">
              <Supplier
                {...{ suppliers, newSupplier, type, restricted }}
                className="mb2"
              />
              <CareLabels
                {...{ labels, addCareLabel, removeCareLabel }}
                className={showFor('Fabric')}
              />
            </div>
          </div>
        </div>
        {!restricted &&
          <footer className="p2 center">
            <Button type="submit" disabled={submitting} label="Save" />
          </footer>}
      </form>
    );
  }
}

Form.propTypes = {
  submitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  newSupplier: PropTypes.func,
  addCareLabel: PropTypes.func,
  removeCareLabel: PropTypes.func,
  types: PropTypes.object,
  colors: PropTypes.object,
  currencies: PropTypes.object,
  suppliers: PropTypes.object,
  labels: PropTypes.object,
  initialValues: PropTypes.object,
  abilities: PropTypes.object,
};

export default reduxForm({
  form: 'Material',
})(Form);
