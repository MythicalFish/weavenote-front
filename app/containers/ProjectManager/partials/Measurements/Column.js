import React from 'react';
import { Field } from 'redux-form/immutable';

const renderField = ({ input, maxLength, type, meta: { touched, error } }) => (
  <div>
    <input {...input} type={type} maxLength={maxLength} />
  </div>
);

export default function Column({ grouping }) {
  const { constraint, items } = grouping;
  let constraintField = <input type="text" readOnly placeholder="Description" />;
  if (constraint) {
    constraintField = (
      <Field
        name={`${constraint.type}[${constraint.index}].name`}
        type="text"
        component={renderField}
        maxLength={constraint.fieldLength || 3}
      />
    );
  }
  return (
    <div>
      <div>
        {constraintField}
      </div>
      {items.map((item) => {
        const itemKey = `${item.type}[${item.index}]`;
        return (
          <div key={itemKey}>
            <Field
              name={`${itemKey}.value`}
              type={item.fieldType || 'number'}
              component={renderField}
              maxLength={item.fieldLength || 5}
            />
          </div>
        );
      })}
    </div>
  );
}