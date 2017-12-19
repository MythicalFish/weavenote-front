import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import Button from 'components/Button';
import Basics from './FormBasics';
import CareLabels from './FormCareLabels';
import Cost from './FormCost';
import Image from './FormImage';
import Supplier from './FormSupplier';

const Form = (props) => {
  const { isNew, handleSubmit, submitting, readOnly, project } = props;
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
          <div className="box">
            <Image {...props} />
          </div>
          <div className="box">
            <Supplier {...props} />
          </div>
          {!readOnly && (
            <div className="box">
              <Cost {...props} />
            </div>
          )}
        </div>
      </div>
      {!readOnly &&
        !project &&
        isNew && (
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
  readOnly: PropTypes.bool,
  isNew: PropTypes.bool,
  handleSubmit: PropTypes.func,
  project: PropTypes.object,
};

export default reduxForm({
  form: 'Material',
})(Form);
