import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import DataRow from 'components/DataRow';
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
      addCareLabel, removeCareLabel,
    } = this.props;
    const { type } = this.state;
    const { showFor } = this;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="data-rows mb2">
              <Field name="type" type="select" component={DataRow} label="Type" data={types} onChanged={this.switchType} />
              <Field name="name" type="text" component={DataRow} label="Name" />
              <Field name="identifier" type="text" component={DataRow} label="Identifier" />
              <Field name="color" type="select" component={DataRow} label="Color" data={colors} />
              <Field name="composition" type="text" component={DataRow} label="Composition" className={showFor('Fabric')} />
              <Field name="size" type="text" component={DataRow} label="Size" className={showFor(['Button', 'Zip'])} />
              <Field name="length" type="text" component={DataRow} label="Length" className={showFor('Zip')} />
              <Field name="subtype" type="text" component={DataRow} label="Zip Type" className={showFor('Zip')} />
              <Field name="opening_type" type="text" component={DataRow} label="Opening Type" className={showFor('Zip')} />
            </div>
            <div className="data-rows">
              <Field name="currency" type="select" component={DataRow} label="Currency" data={currencies} />
              <Field name="cost_base" type="text" component={DataRow} label="Base cost" />
              <Field name="cost_delivery" type="text" component={DataRow} label="Delivery cost" />
              <Field name="cost_extra1" type="text" component={DataRow} label="Extra cost 1" />
              <Field name="cost_extra2" type="text" component={DataRow} label="Extra cost 2" />
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
