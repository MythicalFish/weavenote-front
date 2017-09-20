import React, { PropTypes } from 'react';
import { Field } from 'redux-form/immutable';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import MeasurementNameLabel from './MeasurementNameLabel';
import Input from './Input';

const MeasurementNameInput = (props) => (
  <Field {...props} maxLength={25} component={Input} placeholder="Untitled" />
);

const SortableList = SortableContainer((props) => {
  const fieldKey = (i) => `names[${i}].value`;
  const { names } = props;
  const lProps = { ...props };
  delete lProps.names;
  return (
    <div>
      {names.map((name, index) => (
        <MeasurementNameLabel
          {...{
            name,
            Input: MeasurementNameInput,
            inputName: fieldKey(index),
            index,
            key: fieldKey(index),
            ...lProps,
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
        const names = arrayMove(props.names.toArray(), oldIndex, newIndex);
        props.reorder({ names });
      }}
    />
  </div>
);

MeasurementNameColumn.propTypes = {
  names: PropTypes.object,
  reorder: PropTypes.func,
};

export default MeasurementNameColumn;
