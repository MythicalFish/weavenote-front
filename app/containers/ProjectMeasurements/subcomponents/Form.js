import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import PlusButton from 'components/PlusButton';
import MeasurementNameColumn from './MeasurementNameColumn';
import MeasurementGroups from './MeasurementGroups';

const Form = (props) => {
  const { initialValues, startAnnotation, project } = props;
  const id = project.get('id');
  return (
    <div>
      <div className="flex">
        <form onSubmit={props.handleSubmit} className="columns">
          <MeasurementNameColumn
            {...{
              names: initialValues.get('names'),
              submitForm: props.onSubmit,
              ...props,
            }}
          />
          <MeasurementGroups {...props} />
          <button type="submit" className="conceal" />
        </form>
        <div>
          <PlusButton
            size={25}
            onClick={() => props.createGroup(id)}
            className="p0"
          />
        </div>
      </div>
      <div className="pt1">
        <PlusButton
          size={25}
          onClick={() => props.createName(id)}
          className="p0"
        />
      </div>
    </div>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object,
  project: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  startAnnotation: PropTypes.func,
  deleteGroup: PropTypes.func,
  deleteName: PropTypes.func,
  createName: PropTypes.func,
  createGroup: PropTypes.func,
  reorderNames: PropTypes.func,
};

export default reduxForm({
  form: 'Measurements',
})(Form);
