import React, { PropTypes } from 'react';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import ColumnLabel from './ColumnLabel';

const SortableColumnLabels = SortableContainer((props) => {
  const { measurements, updateMeasurements, readOnly } = props;
  return (
    <div className="flex flex-none">
      {measurements.groups.map((group, index) => (
        <ColumnLabel
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

const ColumnLabels = (props) => (
  <SortableColumnLabels
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

ColumnLabels.propTypes = {
  measurements: PropTypes.object,
  reorder: PropTypes.func,
};

export default ColumnLabels;
