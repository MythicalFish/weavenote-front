import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
import { cantRoleEdit } from 'utils/roles';
import Supplier from './Supplier';
import CareLabels from './CareLabels';
class Form extends React.Component {

  state = { type: null }

  componentWillMount = () => {
    const { initialValues: v } = this.props;
    const type = v.get('type');
    if (type) this.switchType(type);
  }

  switchType = (type) => {
    this.setState({ type: type.get('name') });
  }

  is = (type) => {
    let t = type;
    if (!Array.isArray(t)) t = [t];
    return t.includes(this.state.type);
  }

  showFor = (type) => {
    if (!this.is(type)) return 'conceal';
    return '';
  }

  render() {
    const {
      handleSubmit, submitting, types, colors, currencies, labels, suppliers, newSupplier,
      addCareLabel, removeCareLabel, userRole,
    } = this.props;
    const { type } = this.state;
    const { showFor } = this;
    const fProps = {
      component: DataRow,
      noEdit: cantRoleEdit(userRole),
    };
    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="data-rows mb2">
              <Field name="type" type="select" label="Type" data={types} onChanged={this.switchType} {...fProps} />
              <Field name="name" type="text" label="Name" {...fProps} />
              <Field name="identifier" type="text" label="Identifier" {...fProps} />
              <Field name="color" type="select" label="Color" data={colors} {...fProps} />
              <Field name="composition" type="text" label="Composition" className={showFor('Fabric')} {...fProps} />
              <Field name="size" type="text" label="Size" className={showFor(['Button', 'Zip'])} {...fProps} />
              <Field name="length" type="text" label="Length" className={showFor('Zip')} {...fProps} />
              <Field name="subtype" type="text" label="Zip Type" className={showFor('Zip')} {...fProps} />
              <Field name="opening_type" type="text" label="Opening Type" className={showFor('Zip')} {...fProps} />
            </div>
            <div className="data-rows">
              <Field name="currency" type="select" label="Currency" data={currencies} {...fProps} />
              <Field name="cost_base" type="text" label="Base cost" {...fProps} />
              <Field name="cost_delivery" type="text" label="Delivery cost" {...fProps} />
              <Field name="cost_extra1" type="text" label="Extra cost 1" {...fProps} />
              <Field name="cost_extra2" type="text" label="Extra cost 2" {...fProps} />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <Supplier {...{ suppliers, newSupplier, type }} className="mb2" />
            <CareLabels {...{ labels, addCareLabel, removeCareLabel }} className={showFor('Fabric')} />
          </div>
        </div>
        <footer className="p2 center">
          <button className="btn-color2x" type="submit" disabled={submitting}>Save</button>
        </footer>
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
};

export default reduxForm({
  form: 'Material',
})(Form);
