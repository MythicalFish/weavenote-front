import React, { PropTypes } from 'react';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import Label from './MeasurementNameLabel';

const SortableList = SortableContainer((props) => {
  const fieldKey = (i) => `names[${i}].value`;
  const { names } = props;
  const lProps = { ...props };
  delete lProps.names;
  return (
    <div className="column-body">
      {names.map((name, index) => (
        <Label
          {...{
            name,
            index,
            ...lProps,
            key: fieldKey(index),
            inputName: fieldKey(index),
          }}
        />
      ))}
    </div>
  );
});

const MeasurementNameColumn = (props) => (
  <div className="column left-align">
    <div className="column-header px1">
      <label className="opa5">Description</label>
    </div>
    <SortableList
      {...props}
      lockToContainerEdges
      distance={10}
      onSortEnd={({ oldIndex, newIndex }) => {
        const names = arrayMove(props.names, oldIndex, newIndex);
        props.reorder({ names });
      }}
    />
  </div>
);

MeasurementNameColumn.propTypes = {
  names: PropTypes.array,
  reorder: PropTypes.func,
};

export default MeasurementNameColumn;
