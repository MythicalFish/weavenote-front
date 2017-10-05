import React, { PropTypes } from 'react';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import ScrollArea from 'components/ScrollArea';
import MeasurementGroup from './MeasurementGroup';

const SortableMeasurementGroups = SortableContainer((props) => {
  const { measurements } = props;
  const fieldKey = (i) => `groups[${i}].name`;
  return (
    <ScrollArea>
      <div className="flex">
        {measurements.groups.map((group, index) => (
          <MeasurementGroup
            {...{
              index,
              key: fieldKey(index),
              fieldName: fieldKey(index),
              group,
              measurements,
              submitForm: props.onSubmit,
              doDelete: props.deleteGroup,
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
      const groups = arrayMove(props.measurements.groups, oldIndex, newIndex);
      props.reorder({ groups });
    }}
  />
);

MeasurementGroups.propTypes = {
  measurements: PropTypes.object,
  reorder: PropTypes.func,
};

export default MeasurementGroups;
