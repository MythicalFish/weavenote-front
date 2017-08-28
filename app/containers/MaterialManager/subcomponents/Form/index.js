import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import FocusableField, { FormField } from 'components/FormField';
import Button from 'components/Button';
import Basics from './Basics';
import CareLabels from './CareLabels';
import Supplier from './Supplier';
import Cost from './Cost';
import Image from './Image';

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
    const { handleSubmit, submitting, initialValues: material } = this.props;
    const { type } = this.state;
    const { showFor, switchType } = this;

    const restricted = !this.props.abilities.update;

    const F = (fProps) => {
      const p = { ...fProps };
      p.className = p.c;
      p.component = p.type === 'select' ? FormField : FocusableField;
      p.theme = 'alt1';
      delete p.c;
      return <Field {...{ restricted, ...p }} />;
    };

    const props = { showFor, switchType, F, type, ...this.props };

    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="box">
              <h3>Basics</h3>
              <Basics {...props} />
            </div>
            <div className="box">
              <h3>Image</h3>
              <Image {...{ material }} />
            </div>
            <div className="box">
              <h3>Care labels</h3>
              <CareLabels {...props} />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="box">
              <h3>Cost</h3>
              <Cost {...props} />
            </div>
            <div className="box">
              <h3>Supplier</h3>
              <Supplier {...props} />
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
  initialValues: PropTypes.object,
  abilities: PropTypes.object,
};

export default reduxForm({
  form: 'Material',
})(Form);
