import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import FocusableField, { FormField } from 'components/FormField';
import Button from 'components/Button';
import Basics from './FormBasics';
import CareLabels from './FormCareLabels';
import Supplier from './FormSupplier';
import Cost from './FormCost';
import Image from './FormImage';

class FormLayout extends React.Component {
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

  Field = (props) => {
    const p = { ...props };
    p.component = p.type === 'select' ? FormField : FocusableField;
    p.theme = 'alt1';
    p.className = p.c;
    delete p.c;
    const restricted = !this.props.abilities.update;
    if (!this.props.isNew) {
      p.onBlur = this.props.onSubmit;
    }
    return <Field {...{ ...p, restricted }} />;
  };

  render() {
    const {
      handleSubmit,
      submitting,
      initialValues: material,
      isNew,
    } = this.props;
    const { type } = this.state;
    const { showFor, switchType, Field: F } = this;

    const restricted = !this.props.abilities.update;

    const props = {
      showFor,
      switchType,
      F,
      type,
      ...this.props,
    };

    const submitBtnClass = isNew ? '' : 'conceal';

    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="box">
              <h3>Material</h3>
              <Basics {...props} />
            </div>
            <div className="box">
              <h3>Care labels</h3>
              <CareLabels {...props} />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            {material.get('id') && (
              <div className="box">
                <h3>Image</h3>
                <Image {...{ material }} />
              </div>
            )}
            <div className="box">
              <h3>Base cost</h3>
              <Cost {...props} />
            </div>
          </div>
        </div>
        {!restricted && (
          <footer className="p2 center">
            <Button
              type="submit"
              disabled={submitting}
              label="Create material"
              className={`btn ${submitBtnClass}`}
            />
          </footer>
        )}
      </form>
    );
  }
}

FormLayout.propTypes = {
  submitting: PropTypes.bool,
  isNew: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  abilities: PropTypes.object,
};

export default reduxForm({
  form: 'Material',
})(FormLayout);
