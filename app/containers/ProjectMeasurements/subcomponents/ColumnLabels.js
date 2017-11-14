import React, { PropTypes } from 'react';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import ColumnLabel from './ColumnLabel';

const SortableColumnLabels = SortableContainer((props) => (
  <div className="flex flex-none">
    {props.measurements.groups.map((group, colKey) => (
      <ColumnLabel
        {...{
          colWidth: props.colWidths[colKey],
          colKey,
          index: colKey,
          key: `groups[${group.id}].name`,
          group,
          ...props,
        }}
      />
    ))}
  </div>
));

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
