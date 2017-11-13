import React, { PropTypes } from 'react';
import Button from 'components/Button';
import PlusButton from 'components/PlusButton';
import RowLabels from './RowLabels';
import ColumnLabels from './ColumnLabels';
import ColumnValues from './ColumnValues';

const Form = (props) => {
  const { project, showInModal, isModal, readOnly } = props;
  const id = project.get('id');
  return (
    <div id="measurements" className="y-fill">
      <div className="flex y-fill">
        <div className="flex-none mr1">
          <RowLabels {...props} />
        </div>
        <div className="flex-auto">
          <div className="flex scroll-x y-fill">
            <div className="flex-none flex flex-column center mr1">
              <ColumnLabels {...props} />
              <ColumnValues {...props} />
            </div>
            {!readOnly && (
              <div className="flex-none">
                <PlusButton
                  size={25}
                  onClick={() => props.createGroup(id)}
                  className="p0"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pt1">
        {!readOnly && (
          <PlusButton
            size={25}
            onClick={() => props.createName(id)}
            className="p0"
          />
        )}
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
  readOnly: PropTypes.bool,
  project: PropTypes.object,
  createName: PropTypes.func,
  showInModal: PropTypes.func,
  isModal: PropTypes.bool,
};

export default Form;
