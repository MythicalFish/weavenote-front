import React, { PropTypes } from 'react';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import RowLabel from './RowLabel';

const SortableList = SortableContainer((props) => {
  const { measurements, colWidths } = props;
  const lProps = { ...props };
  delete lProps.measurements;
  return (
    <div className="column-body relative">
      {measurements.names.map((name, index) => (
        <RowLabel
          {...{
            name,
            index,
            colKey: `l${index}`,
            colWidth: colWidths[`l${index}`],
            ...lProps,
            key: `names[${name.id}].value`,
          }}
        />
      ))}
    </div>
  );
});

const RowLabels = (props) => (
  <div className="column">
    <SortableList
      {...props}
      lockToContainerEdges
      distance={10}
      onSortEnd={({ oldIndex, newIndex }) => {
        const { measurements } = props;
        const { names } = measurements;
        measurements.names = arrayMove(names, oldIndex, newIndex);
        props.reorder(measurements);
      }}
    />
  </div>
);

RowLabels.propTypes = {
  measurements: PropTypes.object,
  reorder: PropTypes.func,
};

export default RowLabels;
