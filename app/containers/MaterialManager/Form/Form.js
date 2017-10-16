import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import Button from 'components/Button';
import Basics from './FormBasics';
import CareLabels from './FormCareLabels';
import Cost from './FormCost';
import Image from './FormImage';
import fieldConstructor from './fieldConstructor';

class Form extends React.PureComponent {
  state = { type: null };

  componentWillMount = () => {
    const { initialValues: v } = this.props;
    const type = v.get('type');
    if (type) this.switchType(type);
  };

  switchType = (type) => {
    this.setState({ type: type.get('name') });
  };

  typeIs = (type) => {
    let t = type;
    if (!Array.isArray(t)) t = [t];
    return t.includes(this.state.type);
  };

  render() {
    const {
      handleSubmit,
      submitting,
      initialValues: material,
      isNew,
    } = this.props;
    const { type } = this.state;
    const { switchType, typeIs } = this;

    const isRestricted = !this.props.abilities.update;

    const props = {
      switchType,
      type,
      typeIs,
      Field: fieldConstructor({ isNew, isRestricted, handleSubmit }),
      ...this.props,
    };

    const submitBtnClass = isNew ? '' : 'conceal';

    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="box">
              <Basics {...props} />
            </div>
            <div className="box">
              <CareLabels {...props} />
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            {material.get('id') && (
              <div className="box">
                <div className="field">
                  <label>Reference picture</label>
                </div>
                <Image {...{ material }} />
              </div>
            )}
            <div className="box">
              <h3>Base cost</h3>
              <Cost {...props} />
            </div>
          </div>
        </div>
        {!isRestricted && (
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

Form.propTypes = {
  submitting: PropTypes.bool,
  isNew: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  abilities: PropTypes.object,
};

export default reduxForm({
  form: 'Material',
})(Form);
