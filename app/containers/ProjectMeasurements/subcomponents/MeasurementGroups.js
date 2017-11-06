import React, { PropTypes } from 'react';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import MeasurementGroup from './MeasurementGroup';
import { COLUMNS_OFFSET } from '../constants';

const SortableMeasurementGroups = SortableContainer((props) => {
  const { measurements, updateMeasurements, readOnly } = props;
  return (
    <div className="flex cut" {...COLUMNS_OFFSET}>
      {measurements.groups.map((group, index) => (
        <MeasurementGroup
          {...{
            index,
            key: `groups[${group.id}].name`,
            group,
            measurements,
            doDelete: props.deleteGroup,
            updateMeasurements,
            readOnly,
          }}
        />
      ))}
    </div>
  );
});

const MeasurementGroups = (props) => (
  <SortableMeasurementGroups
    {...props}
    lockToContainerEdges
    distance={10}
    axis="x"
    onSortEnd={({ oldIndex, newIndex }) => {
      const { measurements } = props;
      const { groups } = measurements;
      measurements.groups = arrayMove(groups, oldIndex, newIndex);
      props.reorder(measurements);
    }}
  />
);

MeasurementGroups.propTypes = {
  measurements: PropTypes.object,
  reorder: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default MeasurementGroups;
