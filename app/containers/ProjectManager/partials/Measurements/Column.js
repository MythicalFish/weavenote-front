import React from 'react';
import { Field } from 'redux-form/immutable';

const renderField = ({ input, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input {...input} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export default function Column({ grouping }) {
  const { constraint, items } = grouping;
  let constraintField = <input type="text" readOnly />;
  if (constraint) {
    constraintField = (
      <Field
        name={`${constraint.type}[${constraint.index}].name`}
        type="text"
        component={renderField}
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
              type="text"
              component={renderField}
            />
          </div>
        );
      })}
    </div>
  );
}