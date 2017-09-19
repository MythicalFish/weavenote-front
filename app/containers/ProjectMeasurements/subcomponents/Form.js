import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form/immutable';
import PlusButton from 'components/PlusButton';
import MeasurementNameColumn from './MeasurementNameColumn';
import MeasurementGroupColumn from './MeasurementGroupColumn';

const Form = (props) => {
  const { initialValues, addAnnotation, project } = props;
  const id = project.get('id');
  return (
    <div>
      <div className="flex">
        <form onSubmit={props.handleSubmit} id="measurements">
          <MeasurementNameColumn
            {...{
              names: initialValues.get('names'),
              submitForm: props.onSubmit,
              addAnnotation,
              doDelete: props.deleteName,
              doReorder: props.reorderNames,
            }}
          />
          {initialValues.get('groups').map((group, index) => (
            <MeasurementGroupColumn
              {...{
                key: group,
                group,
                index,
                initialValues,
                submitForm: props.onSubmit,
                doDelete: props.deleteGroup,
              }}
            />
          ))}

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
  addAnnotation: PropTypes.func,
  deleteGroup: PropTypes.func,
  deleteName: PropTypes.func,
  createName: PropTypes.func,
  createGroup: PropTypes.func,
  reorderNames: PropTypes.func,
};

export default reduxForm({
  form: 'Measurements',
})(Form);
