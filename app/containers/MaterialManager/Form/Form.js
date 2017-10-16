import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import Button from 'components/Button';
import Basics from './FormBasics';
import CareLabels from './FormCareLabels';
import Cost from './FormCost';
import Image from './FormImage';

const Form = (props) => {
  const {
    isNew,
    handleSubmit,
    initialValues: material,
    submitting,
    isRestricted,
  } = props;
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
            className={`btn ${isNew ? '' : 'conceal'}`}
          />
        </footer>
      )}
    </form>
  );
};

Form.propTypes = {
  submitting: PropTypes.bool,
  isRestricted: PropTypes.bool,
  isNew: PropTypes.bool,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
};

export default reduxForm({
  form: 'Material',
})(Form);
