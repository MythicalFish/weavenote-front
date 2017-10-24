import React, { PropTypes } from 'react';
import Button from 'components/Button';
import PlusButton from 'components/PlusButton';
import MeasurementNameColumn from './MeasurementNameColumn';
import MeasurementGroups from './MeasurementGroups';

const Form = (props) => {
  const { project, showInModal, isModal } = props;
  const id = project.get('id');
  return (
    <div className="y-fill flex flex-column">
      <div className="flex" id="measurements">
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
      </div>
      <div className="pt1 flex">
        <PlusButton
          size={25}
          onClick={() => props.createName(id)}
          className="p0"
        />
        {!isModal && (
          <div className="ml1">
            <Button
              label="View in modal"
              secondary
              small
              onClick={showInModal}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Form.propTypes = {
  project: PropTypes.object,
  createName: PropTypes.func,
  showInModal: PropTypes.func,
  isModal: PropTypes.bool,
};

export default Form;
