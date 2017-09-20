import React, { PropTypes } from 'react';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import MeasurementGroup from './MeasurementGroup';

const Sortable = SortableContainer((props) => {
  const { initialValues } = props;
  const fieldKey = (i) => `groups[${i}].name`;
  return (
    <div className="columns mr1">
      {initialValues.get('groups').map((group, index) => (
        <MeasurementGroup
          {...{
            index,
            key: fieldKey(index),
            fieldName: fieldKey(index),
            group,
            initialValues,
            submitForm: props.onSubmit,
            doDelete: props.deleteGroup,
          }}
        />
      ))}
    </div>
  );
});

const MeasurementGroups = (props) => (
  <Sortable
    {...props}
    lockToContainerEdges
    distance={10}
    axis="x"
    onSortEnd={({ oldIndex, newIndex }) => {
      const groups = arrayMove(
        props.initialValues.get('groups').toArray(),
        oldIndex,
        newIndex
      );
      props.reorder({ groups });
    }}
  />
);

MeasurementGroups.propTypes = {
  initialValues: PropTypes.object,
  reorder: PropTypes.func,
};

export default MeasurementGroups;
