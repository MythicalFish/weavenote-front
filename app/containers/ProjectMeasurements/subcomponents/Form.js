import React, { PropTypes } from 'react';
import PlusButton from 'components/PlusButton';
import MeasurementNameColumn from './MeasurementNameColumn';
import MeasurementGroups from './MeasurementGroups';

const Form = (props) => {
  const { project } = props;
  const id = project.get('id');
  return (
    <div className="y-fill">
      <form onSubmit={props.handleSubmit} className="flex" id="measurements">
        <button type="submit" className="conceal" />
        <div className="flex-none mr1">
          <MeasurementNameColumn {...props} />
        </div>
        <div className="flex-auto">
          <MeasurementGroups {...props} />
        </div>
        <div className="flex-none">
          <PlusButton
            size={25}
            onClick={() => props.createGroup(id)}
            className="p0"
          />
        </div>
      </form>
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
  measurements: PropTypes.object,
  project: PropTypes.object,
  handleSubmit: PropTypes.func,
  createName: PropTypes.func,
};

export default Form;
