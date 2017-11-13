import React, { PropTypes } from 'react';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import RowLabel from './RowLabel';

const SortableList = SortableContainer((props) => {
  const { measurements } = props;
  const lProps = { ...props };
  delete lProps.measurements;
  return (
    <div className="column-body">
      {measurements.names.map((name, index) => (
        <RowLabel
          {...{
            name,
            index,
            ...lProps,
            key: `names[${name.id}].value`,
          }}
        />
      ))}
    </div>
  );
});

const RowLabels = (props) => (
  <div className="column left-align">
    <div className="column-header px1">
      <label className="opa5">Description</label>
    </div>
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
