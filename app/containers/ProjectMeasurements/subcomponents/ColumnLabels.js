import React, { PropTypes } from 'react';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import ColumnLabel from './ColumnLabel';

const SortableColumnLabels = SortableContainer((props) => (
  <div className="flex">
    {props.measurements.groups.map((group, colKey) => (
      <ColumnLabel
        {...{
          colWidth: props.colWidths[colKey] ? props.colWidth[colKey].max : 0,
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
