import React, { PropTypes } from 'react';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import ScrollArea from 'components/ScrollArea';
import MeasurementGroup from './MeasurementGroup';

const SortableMeasurementGroups = SortableContainer((props) => {
  const { measurements, updateMeasurements } = props;
  return (
    <ScrollArea>
      <div className="flex">
        {measurements.groups.map((group, index) => (
          <MeasurementGroup
            {...{
              index,
              key: `groups[${group.id}].name`,
              group,
              measurements,
              doDelete: props.deleteGroup,
              updateMeasurements,
            }}
          />
        ))}
      </div>
    </ScrollArea>
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
};

export default MeasurementGroups;
